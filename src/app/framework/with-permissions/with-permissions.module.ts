import { NgModule } from '@angular/core';

import { WithPermissionsPipe } from './with-permissions.pipe';

@NgModule({
  declarations: [
    WithPermissionsPipe,
  ],
  exports: [
    WithPermissionsPipe,
  ],
})
export class WithPermissionsModule { }
