import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ToastrComponent } from './toastr.component';
import { ToastrService } from './toastr.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  declarations: [
    ToastrComponent,
  ],
  providers: [
    ToastrService,
  ],
  exports: [
    ToastrComponent,
  ],
})
export class ToastrModule { }
