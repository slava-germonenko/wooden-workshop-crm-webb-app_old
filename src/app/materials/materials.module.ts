import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

import { ConfirmationDialogModule } from '@framework/confirmation-dialog';
import { DynamicFormDialogModule } from '@framework/dynamic-form-dialog';
import { DynamicTableModule } from '@framework/dynamic-table';
import { SearchFieldModule } from '@framework/search-field';
import { ToastrModule } from '@framework/toastr';
import { WithTokenInterceptor } from '@common/interceptors';

import { MaterialsService } from './common';
import { MaterialsComponent } from './materials.component';
import { MaterialsStateService } from './materials-state.service';
import { routes } from './materials.routes';

@NgModule({
  imports: [
    CommonModule,
    ConfirmationDialogModule,
    DynamicFormDialogModule,
    DynamicTableModule,
    HttpClientModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    SearchFieldModule,
    ToastrModule,
  ],
  declarations: [
    MaterialsComponent,
  ],
  providers: [
    MaterialsService,
    MaterialsStateService,
    { provide: HTTP_INTERCEPTORS, useClass: WithTokenInterceptor, multi: true },
  ],
})
export class MaterialsModule { }
