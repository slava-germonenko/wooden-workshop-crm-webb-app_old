import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { DocumentViewerModule } from '@framework/document-viewer';

import { PreviewDialogComponent } from './preview-dialog.component';
import { PreviewDialogService } from './preview-dialog.service';

@NgModule({
  imports: [
    CommonModule,
    DocumentViewerModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
  providers: [
    PreviewDialogService,
  ],
  declarations: [
    PreviewDialogComponent,
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    PreviewDialogComponent,
  ],
})
export class PreviewDialogModule { }
