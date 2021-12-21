import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingDirective } from './loading.directive';
import { LoadingComponent } from './loading.component';

@NgModule({
  imports: [
    MatProgressSpinnerModule,
  ],
  declarations: [
    LoadingComponent,
    LoadingDirective,
  ],
  exports: [
    LoadingComponent,
    LoadingDirective,
  ],
})
export class LoadingModule { }
