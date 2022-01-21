import { NgModule } from '@angular/core';

import { FullNamePipe } from './full-name.pipe';
import { PermissionLabelPipe } from './permission-label.pipe';

@NgModule({
  declarations: [
    FullNamePipe,
    PermissionLabelPipe,
  ],
  exports: [
    FullNamePipe,
    PermissionLabelPipe,
  ],
})
export class CommonPipesModule { }
