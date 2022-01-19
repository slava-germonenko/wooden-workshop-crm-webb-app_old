import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  filter,
  forkJoin,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

import { ConfirmationDialogService } from '@framework/confirmation-dialog';
import { DynamicFormDialogService } from '@framework/dynamic-form-dialog';
import { FilePickerDialogService } from '@framework/file-picker-dialog';
import { ToastrService } from '@framework/toastr';
import { ALLOWED_ASSET_FILE_EXTENSIONS, DEFAULT_ERROR_MESSAGE } from '@common/constants';
import { IPage, IButton } from '@common/interfaces';
import { IAsset, IFolder } from '@common/interfaces/models';

import {
  ADD_FOLDER_DIALOG_CONFIG,
  RENAME_FOLDER_DIALOG_CONFIG,
  AssetsService,
  FoldersService, RENAME_ASSET_DIALOG_CONFIG,
} from './common';
import { BASE_EDIT_ACTION, BASE_MOVE_ACTION, BASE_REMOVE_ACTION } from './actions';

const MAX_PAGE: IPage = {
  index: 0,
  size: 1000,
};

@Injectable()
export class AssetsPageStateService {
  private readonly assetsSelection = new SelectionModel<IAsset>(true);

  private readonly assetsSource = new BehaviorSubject<IAsset[]>([]);

  private readonly foldersHierarchySource = new BehaviorSubject<IFolder[]>([]);

  private readonly foldersSelection = new SelectionModel<IFolder>(true);

  private readonly foldersSource = new BehaviorSubject<IFolder[]>([]);

  public readonly actions$: Observable<IButton[]>;

  public readonly assets$ = this.assetsSource.asObservable();

  public readonly foldersHierarchy$ = this.foldersHierarchySource.asObservable();

  public readonly folders$ = this.foldersSource.asObservable();

  public get currentFolderSnapshot(): IFolder | null {
    const folders = this.foldersHierarchySnapshot;
    return folders.length ? folders[folders.length - 1] : null;
  }

  public get foldersHierarchySnapshot(): IFolder[] {
    return this.foldersHierarchySource.value;
  }

  public constructor(
    private readonly assetsService: AssetsService,
    private readonly confirmationDialogService: ConfirmationDialogService,
    private readonly dynamicFormDialogService: DynamicFormDialogService,
    private readonly filePickerDialogService: FilePickerDialogService,
    private readonly foldersService: FoldersService,
    private readonly toastrService: ToastrService,
  ) {
    this.actions$ = combineLatest([
      this.assetsSelection.changed.pipe(startWith([])),
      this.foldersSelection.changed.pipe(startWith([])),
    ])
      .pipe(
        map(() => this.getActions()),
      );
  }

  public clearAssetsSelection(): void {
    this.assetsSelection.clear();
  }

  public clearFoldersSelection(): void {
    this.foldersSelection.clear();
  }

  public createFolder(): void {
    this.dynamicFormDialogService.openFormDialog(ADD_FOLDER_DIALOG_CONFIG)
      .afterClosed()
      .pipe(
        filter((folder: { name: string }) => !!folder?.name),
        switchMap(({ name }) => {
          const currentFolderId = this.currentFolderSnapshot?.id;
          return this.foldersService.createFolder({ name, parentFolderId: currentFolderId });
        }),
      )
      .subscribe({
        next: (folder) => this.addFolderLocally(folder),
        error: (err: HttpErrorResponse) => this.toastrService.error(err.error?.message ?? DEFAULT_ERROR_MESSAGE),
      });
  }

  public goToFolder(folder: IFolder | null, forceReload: boolean = false): void {
    if (this.currentFolderSnapshot?.id === folder?.id && !forceReload) {
      return;
    }

    this.getLoadFolderContentObservable(folder?.id)
      .subscribe(() => {
        this.setCurrentFolder(folder);
        this.clearSelections();
      });
  }

  public isAssetSelected(asset: IAsset): boolean {
    return this.assetsSelection.isSelected(asset);
  }

  public isFolderSelected(folder: IFolder): boolean {
    return this.foldersSelection.isSelected(folder);
  }

  public removeSelectedAssets(): void {
    if (!this.assetsSelection.selected.length) {
      return;
    }

    const selectedAssetIds = this.assetsSelection.selected.map((asset) => asset.id);
    const unselectedAssets = this.assetsSource.value
      .filter((asset) => !selectedAssetIds.includes(asset.id));

    this.assetsService.removeAssets(selectedAssetIds)
      .subscribe(() => {
        this.clearSelections();
        this.assetsSource.next(unselectedAssets);
      });
  }

  public removeSelectedFolders(): void {
    if (!this.foldersSelection.selected.length) {
      return;
    }

    const selectedFolderIds = this.foldersSelection.selected.map((folder) => folder.id);
    const unselectedFolders = this.foldersSource.value
      .filter((folder) => !selectedFolderIds.includes(folder.id));

    const folderNames = this.foldersSelection.selected.map((folder) => folder.name);
    this.confirmationDialogService.open({
      title: 'Удаление папок',
      question: 'Вы действительно хотите удалить следующие папаки:',
      termsList: folderNames,
    }).confirmed$
      .pipe(
        switchMap(() => this.foldersService.removeFolders(selectedFolderIds)),
      )
      .subscribe(() => {
        this.clearSelections();
        this.foldersSource.next(unselectedFolders);
      });
  }

  public renameSelectedAsset(): void {
    if (!this.assetsSelection.selected.length) {
      return;
    }

    const assetToRename = this.assetsSelection.selected[0];
    this.dynamicFormDialogService.openFormDialog(
      RENAME_ASSET_DIALOG_CONFIG,
      { assetName: assetToRename.assetName },
    )
      .afterClosed()
      .pipe(
        filter((asset) => !!asset),
        switchMap(({ assetName }) => {
          return this.assetsService.updateAssetDetails({ ...assetToRename, assetName });
        }),
      )
      .subscribe({
        next: (asset) => {
          this.updateAssetLocally(asset);
          this.clearSelections();
        },
        error: (err: HttpErrorResponse) => this.toastrService.error(err.error?.message ?? DEFAULT_ERROR_MESSAGE),
      });
  }

  public renameSelectedFolder(): void {
    if (!this.foldersSelection.selected.length) {
      return;
    }

    const folderToRename = this.foldersSelection.selected[0];
    this.dynamicFormDialogService.openFormDialog(RENAME_FOLDER_DIALOG_CONFIG, { name: folderToRename.name })
      .afterClosed()
      .pipe(
        filter((file) => !!file),
        switchMap(({ name }) => this.foldersService.updateFolder({ ...folderToRename, name })),
      )
      .subscribe({
        next: (folder) => {
          this.updateFolderLocally(folder);
          this.clearSelections();
        },
        error: (err: HttpErrorResponse) => this.toastrService.error(err.error?.message ?? DEFAULT_ERROR_MESSAGE),
      });
  }

  public toggleAssetSelection(asset: IAsset): void {
    this.assetsSelection.toggle(asset);
    this.foldersSelection.clear();
  }

  public toggleFolderSelection(folder: IFolder): void {
    this.foldersSelection.toggle(folder);
    this.assetsSelection.clear();
  }

  public uploadAsset(): void {
    this.filePickerDialogService.open({ allowedFileTypes: [...ALLOWED_ASSET_FILE_EXTENSIONS] }).submitted$
      .pipe(
        switchMap((files) => this.assetsService.uploadAssets(files, this.currentFolderSnapshot?.id)),
      )
      .subscribe((assets) => {
        this.addAssetsLocally(assets);
        this.clearSelections();
      });
  }

  private addAssetsLocally(assets: IAsset[]): void {
    const currentAssets = this.assetsSource.value;
    assets.forEach((asset) => {
      // eslint-disable-next-line eqeqeq
      if (asset.folder == this.currentFolderSnapshot?.id) {
        currentAssets.push(asset);
      }
    });
    currentAssets.sort((a1, a2) => a1.assetName.localeCompare(a2.assetName));
    this.assetsSource.next([...currentAssets]);
  }

  private addFolderLocally(folder: IFolder): void {
    const folders = this.foldersSource.value;
    folders.push(folder);
    folders.sort((f1, f2) => f1.name.localeCompare(f2.name));
    this.foldersSource.next([...folders]);
  }

  private clearSelections(): void {
    this.assetsSelection.clear();
    this.foldersSelection.clear();
  }

  private getActions(): IButton[] {
    const buttons: IButton[] = [];
    if (this.assetsSelection.selected.length === 1) {
      buttons.push({ ...BASE_EDIT_ACTION, click: () => this.renameSelectedAsset() });
      buttons.push({ ...BASE_MOVE_ACTION });
    }
    if (this.foldersSelection.selected.length === 1) {
      buttons.push({ ...BASE_EDIT_ACTION, click: () => this.renameSelectedFolder() });
      buttons.push({ ...BASE_MOVE_ACTION });
    }
    if (this.assetsSelection.selected.length) {
      buttons.push({ ...BASE_REMOVE_ACTION, click: () => this.removeSelectedAssets() });
    }
    if (this.foldersSelection.selected.length) {
      buttons.push({ ...BASE_REMOVE_ACTION, click: () => this.removeSelectedFolders() });
    }

    return buttons;
  }

  private getLoadFolderContentObservable(folderId?: string): Observable<void> {
    return forkJoin([
      this.assetsService.getAssetsList(MAX_PAGE, folderId),
      this.foldersService.getFoldersList(MAX_PAGE, folderId),
    ])
      .pipe(
        tap(([assetsPage, foldersPage]) => {
          this.assetsSource.next(assetsPage.items);
          this.foldersSource.next(foldersPage.items);
        }),
        map(() => {}),
      );
  }

  private setCurrentFolder(folder: IFolder | null): void {
    if (folder === null) {
      this.foldersHierarchySource.next([]);
      return;
    }

    const currentFolder = this.currentFolderSnapshot;
    const foldersHierarchy = this.foldersHierarchySnapshot;
    if (folder.parentFolderId === currentFolder?.id) {
      foldersHierarchy.push(folder);
      this.foldersHierarchySource.next([...foldersHierarchy]);
      return;
    }

    const folderIndexInHierarchy = foldersHierarchy.findIndex((f) => f.id === folder.id);
    if (folderIndexInHierarchy < 0) {
      this.foldersHierarchySource.next([folder]);
      return;
    }

    foldersHierarchy.splice(folderIndexInHierarchy + 1);
    this.foldersHierarchySource.next([...foldersHierarchy]);
  }

  private updateAssetLocally(asset: IAsset): void {
    const assetIndex = this.assetsSource.value.findIndex((a) => a.id === asset.id);
    // eslint-disable-next-line eqeqeq
    if (assetIndex >= 0 && asset.folderId == this.currentFolderSnapshot?.id) {
      const assets = this.assetsSource.value;
      assets.splice(assetIndex, 1, asset);
      this.assetsSource.next([...assets]);
    }
  }

  private updateFolderLocally(folder: IFolder): void {
    const folderIndex = this.foldersSource.value.findIndex((f) => f.id === folder.id);
    // eslint-disable-next-line eqeqeq
    if (folderIndex >= 0 && folder.parentFolderId == this.currentFolderSnapshot?.id) {
      const folders = this.foldersSource.value;
      folders.splice(folderIndex, 1, folder);
      this.foldersSource.next([...folders]);
    }
  }
}
