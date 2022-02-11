import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';

import { routes } from './administration.routes';
import { AdministrationComponent } from './administration.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatTreeModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    AdministrationComponent,
  ],
})
export class AdministrationModule { }
