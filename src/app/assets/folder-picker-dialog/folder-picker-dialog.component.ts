import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { IFolder } from '@common/interfaces';

import { FolderPickerStateService } from './folder-picker-state.service';

@Component({
  selector: 'ww-folder-picker',
  templateUrl: 'folder-picker-dialog.component.html',
  styleUrls: ['folder-picker-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FolderPickerStateService],
})
export class FolderPickerDialogComponent implements OnInit {
  public readonly foldersHierarchy$ = this.stateService.foldersHierarchy$;

  public readonly folders$ = this.stateService.folders$;

  public get pickedFolderId(): string | null {
    return this.stateService.pickedFolder?.id ?? null;
  }

  public constructor(private readonly stateService: FolderPickerStateService) { }

  public ngOnInit(): void {
    this.stateService.goToFolder(null, true);
  }

  public goToFolder(folder: IFolder | null): void {
    this.stateService.goToFolder(folder);
  }

  public isFolderSelected(folder: IFolder): boolean {
    return this.stateService.isFolderSelected(folder);
  }

  public toggleFolder(folder: IFolder): void {
    this.stateService.toggleFolder(folder);
  }
}
