import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { ConfirmationDialogService } from './confirmation-dialog.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
  ],
  declarations: [
    ConfirmationDialogComponent,
  ],
  providers: [
    ConfirmationDialogService,
  ],
})
export class ConfirmationDialogModule { }
