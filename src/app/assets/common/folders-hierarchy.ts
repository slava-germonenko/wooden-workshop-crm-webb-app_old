import { BehaviorSubject } from 'rxjs';

import { IFolder } from '@common/interfaces';

export class FoldersHierarchy {
  private readonly hierarchySource = new BehaviorSubject<IFolder[]>([]);

  public readonly changed$ = this.hierarchySource.asObservable();

  public get currentFolderSnapshot(): IFolder | null {
    const folders = this.hierarchySnapshot;
    return folders.length ? folders[folders.length - 1] : null;
  }

  public get hierarchySnapshot(): IFolder[] {
    return this.hierarchySource.value;
  }

  public setCurrentFolder(folder: IFolder | null): void {
    if (folder === null) {
      this.hierarchySource.next([]);
      return;
    }

    const currentFolder = this.currentFolderSnapshot;
    const foldersHierarchy = this.hierarchySource.value;
    if (folder.parentFolderId === currentFolder?.id) {
      foldersHierarchy.push(folder);
      this.hierarchySource.next([...foldersHierarchy]);
      return;
    }

    const folderIndexInHierarchy = foldersHierarchy.findIndex((f) => f.id === folder.id);
    if (folderIndexInHierarchy < 0) {
      this.hierarchySource.next([folder]);
      return;
    }

    foldersHierarchy.splice(folderIndexInHierarchy + 1);
    this.hierarchySource.next([...foldersHierarchy]);
  }
}
