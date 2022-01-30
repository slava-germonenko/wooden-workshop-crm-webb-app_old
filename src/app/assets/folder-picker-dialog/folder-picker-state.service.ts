import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

import { IFolder } from '@common/interfaces';
import { FoldersHierarchy, FoldersService } from '@app/assets/common';
import { SelectionModel } from '@angular/cdk/collections';

@Injectable()
export class FolderPickerStateService {
  private readonly foldersHierarchy = new FoldersHierarchy();

  private readonly foldersSource = new BehaviorSubject<IFolder[]>([]);

  private readonly folderSelection = new SelectionModel<IFolder>();

  public readonly foldersHierarchy$ = this.foldersHierarchy.changed$;

  public readonly folders$ = this.foldersSource.asObservable();

  public readonly pickerFolder$ = combineLatest([
    this.folderSelection.changed,
    this.foldersHierarchy$,
  ])
    .pipe(
      map(() => this.pickedFolder),
    );

  public get pickedFolder(): IFolder | null {
    return this.folderSelection.selected.length
      ? this.folderSelection.selected[0]
      : this.foldersHierarchy.currentFolderSnapshot;
  }

  public constructor(private readonly foldersService: FoldersService) { }

  public goToFolder(folder: IFolder | null, forceReload: boolean = false): void {
    if (this.foldersHierarchy.currentFolderSnapshot?.id === folder?.id && !forceReload) {
      return;
    }

    this.foldersService.getFoldersList({ index: 0, size: 1000 }, folder?.id)
      .subscribe((folders) => {
        this.foldersSource.next(folders.items);
        this.foldersHierarchy.setCurrentFolder(folder);
        this.folderSelection.clear();
      });
  }

  public isFolderSelected(folder: IFolder): boolean {
    return this.folderSelection.isSelected(folder);
  }

  public toggleFolder(folder: IFolder): void {
    this.folderSelection.toggle(folder);
  }
}
