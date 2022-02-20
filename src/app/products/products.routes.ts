import { Routes } from '@angular/router';

import { PermissionsGuard } from '@common/guards';
import { Permissions } from '@common/enums';

import { ProductsComponent } from './products.component';
import { CreateProductComponent } from './create/create-product.component';
import { ProductBasicInformationComponent } from './create/basic/product-basic-information.component';
import { ProductDescriptionComponent } from './create/description/product-description.component';
import { ProductTechSpecsComponent } from './create/tech-specs/product-tech-specs.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProductsComponent,
  },
  {
    path: 'create',
    component: CreateProductComponent,
    canActivate: [PermissionsGuard],
    data: { permissions: [Permissions.Admin, Permissions.ManageProducts] },
    children: [
      { path: '', redirectTo: 'basic' },
      {
        path: 'basic',
        component: ProductBasicInformationComponent,
      },
      {
        path: 'description',
        component: ProductDescriptionComponent,
      },
      {
        path: 'tech-specs',
        component: ProductTechSpecsComponent,
      },
    ],
  },
];
