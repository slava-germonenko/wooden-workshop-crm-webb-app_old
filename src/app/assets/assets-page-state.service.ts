/* eslint-disable eqeqeq */
import { Injectable } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  forkJoin,
  map,
  startWith,
  tap,
} from 'rxjs';
import { saveAs } from 'file-saver';

import { ConfirmationDialogService } from '@framework/confirmation-dialog';
import { DynamicFormDialogService } from '@framework/dynamic-form-dialog';
import { FilePickerDialogService } from '@framework/file-picker-dialog';
import { PreviewDialogService } from '@framework/preview-dialog';
import { AssetsHelper } from '@common/helpers';
import { IPage, IButton } from '@common/interfaces';
import { IAsset, IFolder } from '@common/interfaces/models';

import { AssetsService, FoldersService, FoldersHierarchy } from './common';
import {
  BASE_DOWNLOAD_ACTION,
  BASE_EDIT_ACTION,
  BASE_MOVE_ACTION, BASE_PREVIEW_ACTION,
  BASE_REMOVE_ACTION,
} from './actions';

const MAX_PAGE: IPage = {
  index: 0,
  size: 1000,
};

@Injectable()
export class AssetsPageStateService {
  private readonly assetsSelection = new SelectionModel<IAsset>(true);

  private readonly assetsSource = new BehaviorSubject<IAsset[]>([]);

  private readonly foldersHierarchy = new FoldersHierarchy();

  private readonly foldersSelection = new SelectionModel<IFolder>(true);

  private readonly foldersSource = new BehaviorSubject<IFolder[]>([]);

  public readonly actions$: Observable<IButton[]>;

  public readonly assets$ = this.assetsSource.asObservable();

  public readonly foldersHierarchy$ = this.foldersHierarchy.changed$;

  public readonly folders$ = this.foldersSource.asObservable();

  public constructor(
    private readonly assetsService: AssetsService,
    private readonly confirmationDialogService: ConfirmationDialogService,
    private readonly dynamicFormDialogService: DynamicFormDialogService,
    private readonly filePickerDialogService: FilePickerDialogService,
    private readonly foldersService: FoldersService,
    private readonly previewDialogService: PreviewDialogService,
  ) {
    this.actions$ = combineLatest([
      this.assetsSelection.changed.pipe(startWith([])),
      this.foldersSelection.changed.pipe(startWith([])),
    ])
      .pipe(
        map(() => this.getActions()),
      );
  }

  public addAssets(): void {
    this.assetsService.createAssets(this.foldersHierarchy.currentFolderSnapshot?.id)
      .subscribe((assets) => {
        this.addAssetsLocally(assets);
        this.clearSelections();
      });
  }

  public clearAssetsSelection(): void {
    this.assetsSelection.clear();
  }

  public clearFoldersSelection(): void {
    this.foldersSelection.clear();
  }

  public createFolder(): void {
    this.foldersService.createFolder(this.foldersHierarchy.currentFolderSnapshot?.id)
      .subscribe((folder) => this.addFolderLocally(folder));
  }

  public downloadSelectedAsset(): void {
    if (!this.assetsSelection.selected.length) {
      return;
    }

    const assetToDownload = this.assetsSelection.selected[0];
    if (!assetToDownload.url) {
      throw new Error(`Asset ${assetToDownload.id} URL is undefined`);
    }

    saveAs(assetToDownload.url, assetToDownload.assetName);
  }

  public goToFolder(folder: IFolder | null, forceReload: boolean = false): void {
    if (this.foldersHierarchy.currentFolderSnapshot?.id === folder?.id && !forceReload) {
      return;
    }

    forkJoin([
      this.assetsService.getAssetsList(MAX_PAGE, folder?.id),
      this.foldersService.getFoldersList(MAX_PAGE, folder?.id),
    ])
      .pipe(
        tap(([assetsPage, foldersPage]) => {
          this.assetsSource.next(assetsPage.items);
          this.foldersSource.next(foldersPage.items);
        }),
      )
      .subscribe(() => {
        this.foldersHierarchy.setCurrentFolder(folder);
        this.clearSelections();
      });
  }

  public isAssetSelected(asset: IAsset): boolean {
    return this.assetsSelection.isSelected(asset);
  }

  public isFolderSelected(folder: IFolder): boolean {
    return this.foldersSelection.isSelected(folder);
  }

  public moveSelectedAsset(): void {
    if (!this.assetsSelection.selected.length) {
      return;
    }

    const assetToMove = this.assetsSelection.selected[0];
    this.assetsService.moveAsset(assetToMove)
      .subscribe((asset) => this.updateAssetLocally(asset));
  }

  public moveSelectedFolder(): void {
    if (!this.foldersSelection.selected.length) {
      return;
    }

    const folderToMove = this.foldersSelection.selected[0];
    this.foldersService.moveFolder(folderToMove)
      .subscribe((folder) => this.updateFolderLocally(folder));
  }

  public previewSelectedAsset(): void {
    if (!this.assetsSelection.selected.length) {
      return;
    }

    const { url, assetName } = this.assetsSelection.selected[0];
    const selectedAssetFileType = AssetsHelper.getAssetFileType({ url });
    if (selectedAssetFileType === null) {
      return;
    }

    this.previewDialogService.openPreview(url!, assetName, selectedAssetFileType);
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

    const selectedFolders = this.foldersSelection.selected;
    const unselectedFolders = this.foldersSource.value
      .filter((folder) => !selectedFolders.includes(folder));

    this.foldersService.removeFolders(this.foldersSelection.selected)
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
    this.assetsService.renameAsset(assetToRename)
      .subscribe({
        next: (asset) => {
          this.updateAssetLocally(asset);
          this.clearSelections();
        },
      });
  }

  public renameSelectedFolder(): void {
    if (!this.foldersSelection.selected.length) {
      return;
    }

    const folderToRename = this.foldersSelection.selected[0];
    this.foldersService.renameFolder(folderToRename)
      .subscribe((folder) => {
        this.updateFolderLocally(folder);
        this.clearSelections();
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

  private addAssetsLocally(assets: IAsset[]): void {
    const currentAssets = this.assetsSource.value;
    assets.forEach((asset) => {
      if (asset.folder == this.foldersHierarchy.currentFolderSnapshot?.id) {
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
      buttons.push({ ...BASE_PREVIEW_ACTION, click: () => this.previewSelectedAsset() });
      buttons.push({ ...BASE_DOWNLOAD_ACTION, click: () => this.downloadSelectedAsset() });
      buttons.push({ ...BASE_EDIT_ACTION, click: () => this.renameSelectedAsset() });
      buttons.push({ ...BASE_MOVE_ACTION, click: () => this.moveSelectedAsset() });
    }
    if (this.foldersSelection.selected.length === 1) {
      buttons.push({ ...BASE_EDIT_ACTION, click: () => this.renameSelectedFolder() });
      buttons.push({ ...BASE_MOVE_ACTION, click: () => this.moveSelectedFolder() });
    }
    if (this.assetsSelection.selected.length) {
      buttons.push({ ...BASE_REMOVE_ACTION, click: () => this.removeSelectedAssets() });
    }
    if (this.foldersSelection.selected.length) {
      buttons.push({ ...BASE_REMOVE_ACTION, click: () => this.removeSelectedFolders() });
    }

    return buttons;
  }

  private updateAssetLocally(asset: IAsset): void {
    const assetIndex = this.assetsSource.value.findIndex((a) => a.id === asset.id);
    const assets = this.assetsSource.value;
    if (assetIndex < 0) {
      return;
    }
    if (asset.folderId == this.foldersHierarchy.currentFolderSnapshot?.id) {
      assets.splice(assetIndex, 1, asset);
    } else {
      assets.splice(assetIndex, 1);
    }

    this.assetsSource.next([...assets]);
  }

  private updateFolderLocally(folder: IFolder): void {
    const folderIndex = this.foldersSource.value.findIndex((f) => f.id === folder.id);
    const folders = this.foldersSource.value;

    if (folderIndex < 0) {
      return;
    }
    if (folder.parentFolderId == this.foldersHierarchy.currentFolderSnapshot?.id) {
      folders.splice(folderIndex, 1, folder);
    } else {
      folders.splice(folderIndex, 1);
    }

    this.foldersSource.next([...folders]);
  }
}
