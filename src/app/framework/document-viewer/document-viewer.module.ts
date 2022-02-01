import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentViewerComponent } from './document-viewer.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    DocumentViewerComponent,
  ],
  exports: [
    DocumentViewerComponent,
  ],
})
export class DocumentViewerModule { }
