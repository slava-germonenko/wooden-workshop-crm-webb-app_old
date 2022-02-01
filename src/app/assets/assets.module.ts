import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ConfirmationDialogModule } from '@framework/confirmation-dialog';
import { DynamicFormDialogModule } from '@framework/dynamic-form-dialog';
import { FilePickerDialogModule } from '@framework/file-picker-dialog';
import { LoadingModule } from '@framework/loading/loading.module';
import { PreviewDialogModule } from '@framework/preview-dialog';
import { ToastrModule } from '@framework/toastr';
import { WithPermissionsModule } from '@framework/with-permissions';
import { CommonPipesModule } from '@common/pipes';

import { routes } from './assets.routes';
import { AssetsService, FoldersService } from './common';
import { AssetCardComponent } from './asset-card/asset-card.component';
import { AssetsComponent } from './assets.component';
import { AssetsPageStateService } from './assets-page-state.service';
import { FolderCardComponent } from './folder-card/folder-card.component';
import { FolderPickerDialogComponent } from './folder-picker-dialog/folder-picker-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    CommonPipesModule,
    ConfirmationDialogModule,
    DynamicFormDialogModule,
    FilePickerDialogModule,
    LoadingModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    PreviewDialogModule,
    RouterModule.forChild(routes),
    ToastrModule,
    WithPermissionsModule,
  ],
  declarations: [
    AssetCardComponent,
    AssetsComponent,
    FolderCardComponent,
    FolderPickerDialogComponent,
  ],
  providers: [
    AssetsPageStateService,
    AssetsService,
    FoldersService,
  ],
})
export class AssetsModule { }
