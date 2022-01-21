import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WithPermissionsDirective } from './with-permissions.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    WithPermissionsDirective,
  ],
  exports: [
    CommonModule,
    WithPermissionsDirective,
  ],
})
export class WithPermissionsModule { }
