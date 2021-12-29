import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { DynamicTableComponent } from './dynamic-table.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CdkTableModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  declarations: [
    DynamicTableComponent,
  ],
  exports: [
    DynamicTableComponent,
  ],
})
export class DynamicTableModule { }
