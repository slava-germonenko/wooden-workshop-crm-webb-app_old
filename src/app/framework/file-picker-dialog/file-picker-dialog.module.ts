import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { FilePickerDialogComponent } from './file-picker-dialog.component';
import { FilePickerDialogService } from './file-picker-dialog.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
  ],
  declarations: [
    FilePickerDialogComponent,
  ],
  providers: [
    FilePickerDialogService,
  ],
  exports: [
    MatDialogModule,
  ],
})
export class FilePickerDialogModule { }
