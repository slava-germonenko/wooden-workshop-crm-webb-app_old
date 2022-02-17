import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ConfirmationDialogModule } from '@framework/confirmation-dialog';
import { DynamicFormDialogModule } from '@framework/dynamic-form-dialog';
import { DynamicTableModule } from '@framework/dynamic-table';
import { HandleIconModule } from '@framework/handle-icon';
import { SearchFieldModule } from '@framework/search-field';
import { ToastrModule } from '@framework/toastr';
import { WithTokenInterceptor } from '@common/interceptors';

import { ProductsService } from './common';
import { ProductsComponent } from './products.component';
import { ProductsStateService } from './products-state.service';
import { routes } from './products.routes';

@NgModule({
  imports: [
    CommonModule,
    ConfirmationDialogModule,
    DragDropModule,
    DynamicFormDialogModule,
    DynamicTableModule,
    HandleIconModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    RouterModule.forChild(routes),
    SearchFieldModule,
    ToastrModule,
  ],
  declarations: [
    ProductsComponent,
  ],
  providers: [
    ProductsService,
    ProductsStateService,
    { provide: HTTP_INTERCEPTORS, useClass: WithTokenInterceptor, multi: true },
  ],
})
export class ProductsModule { }
