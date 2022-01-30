import {
  ChangeDetectionStrategy,
  OnInit,
  Component,
  HostBinding,
} from '@angular/core';
import { combineLatest, map, shareReplay } from 'rxjs';

import { Permissions } from '@common/enums';
import { ArrayHelper } from '@common/helpers';
import { IAsset, IFolder } from '@common/interfaces/models';
import { UserStateService } from '@common/services';

import { AssetsPageStateService } from './assets-page-state.service';

@Component({
  selector: 'ww-assets-list',
  templateUrl: 'assets.component.html',
  styleUrls: ['assets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetsComponent implements OnInit {
  @HostBinding('class')
  public hostClasses = ['pad-page-content', 'full-size'];

  public readonly actions$ = combineLatest([
    this.assetsListStateService.actions$,
    this.userStateService.currentUserPermissions$,
  ])
    .pipe(
      map(([actions, permissions]) => {
        return actions.filter(
          (action) => !action.permissions || ArrayHelper.haveIntersection(action.permissions, permissions),
        );
      }),
    );

  public readonly assets$ = this.assetsListStateService.assets$;

  public readonly folders$ = this.assetsListStateService.folders$;

  public readonly foldersHierarchy$ = this.assetsListStateService.foldersHierarchy$;

  public readonly folderIsEmpty$ = combineLatest([this.assets$, this.folders$])
    .pipe(
      map(([assets, folders]) => (assets.length + folders.length) === 0),
      shareReplay(1),
    );

  public loading = true;

  public addButtonPermissions: Permissions[] = [
    Permissions.Admin,
    Permissions.Assets,
  ];

  public uploadAssetPermissions: Permissions[] = [
    Permissions.Admin,
    Permissions.Assets,
    Permissions.ViewAssets,
  ];

  public constructor(
    private readonly assetsListStateService: AssetsPageStateService,
    private readonly userStateService: UserStateService,
  ) { }

  public ngOnInit(): void {
    this.assetsListStateService.goToFolder(null, true);
  }

  public clearAssetsSelection(): void {
    this.assetsListStateService.clearAssetsSelection();
  }

  public clearFoldersSelection(): void {
    this.assetsListStateService.clearFoldersSelection();
  }

  public createFolder(): void {
    this.assetsListStateService.createFolder();
  }

  public goToFolder(folder: IFolder | null): void {
    this.assetsListStateService.goToFolder(folder);
  }

  public isAssetSelected(asset: IAsset): boolean {
    return this.assetsListStateService.isAssetSelected(asset);
  }

  public isFolderSelected(folder: IFolder): boolean {
    return this.assetsListStateService.isFolderSelected(folder);
  }

  public toggleAsset(asset: IAsset): void {
    this.assetsListStateService.toggleAssetSelection(asset);
  }

  public toggleFolder(folder: IFolder): void {
    this.assetsListStateService.toggleFolderSelection(folder);
  }

  public uploadAsset(): void {
    this.assetsListStateService.addAssets();
  }
}
