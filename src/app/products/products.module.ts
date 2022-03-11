import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { ConfirmationDialogModule } from '@framework/confirmation-dialog';
import { DynamicFormDialogModule } from '@framework/dynamic-form-dialog';
import { DynamicTableModule } from '@framework/dynamic-table';
import { HandleIconModule } from '@framework/handle-icon';
import { SearchFieldModule } from '@framework/search-field';
import { ToastrModule } from '@framework/toastr';
import { WithTokenInterceptor } from '@common/interceptors';

import { routes } from './products.routes';
import { ProductsService } from './common';
import { ProductsComponent } from './products.component';
import { ProductsStateService } from './products-state.service';
import { CreateProductComponent } from './create/create-product.component';
import { ProductBasicInformationComponent } from './create/basic/product-basic-information.component';
import { ProductDescriptionComponent } from './create/description/product-description.component';
import { ProductTechSpecsComponent } from './create/tech-specs/product-tech-specs.component';
import { ProductTradingInfoComponent } from './create/trading-info/product-trading-info.component';

@NgModule({
  imports: [
    CommonModule,
    ConfirmationDialogModule,
    DragDropModule,
    DynamicFormDialogModule,
    DynamicTableModule,
    FroalaEditorModule,
    FroalaViewModule,
    HandleIconModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SearchFieldModule,
    ToastrModule,
  ],
  declarations: [
    CreateProductComponent,
    ProductsComponent,
    ProductBasicInformationComponent,
    ProductDescriptionComponent,
    ProductTechSpecsComponent,
    ProductTradingInfoComponent,
  ],
  providers: [
    ProductsService,
    ProductsStateService,
    { provide: HTTP_INTERCEPTORS, useClass: WithTokenInterceptor, multi: true },
  ],
})
export class ProductsModule { }
