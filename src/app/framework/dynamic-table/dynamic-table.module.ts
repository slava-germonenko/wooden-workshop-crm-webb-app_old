import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DynamicTableComponent } from './dynamic-table.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CdkTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
  ],
  declarations: [
    DynamicTableComponent,
  ],
  exports: [
    DynamicTableComponent,
  ],
})
export class DynamicTableModule { }
