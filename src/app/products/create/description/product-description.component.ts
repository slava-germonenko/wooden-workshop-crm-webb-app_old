import {
  ChangeDetectionStrategy,
  OnInit,
  Component,
  HostBinding,
} from '@angular/core';

import { CreateProductStateService } from '@app/products/create/create-product-state.service';
import { FROALA_CONFIG } from '@app/products/common';

@Component({
  selector: 'ww-product-description',
  templateUrl: 'product-description.component.html',
  styleUrls: ['product-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDescriptionComponent implements OnInit {
  @HostBinding('class')
  public hostClasses = ['pad-page-content', 'full-size'];

  public readonly froalaConfig = FROALA_CONFIG;

  public productDescription = this.createProductStateService.productModelSnapshot.description;

  public constructor(private readonly createProductStateService: CreateProductStateService) { }

  public ngOnInit(): void {
    this.setProductDescription('');
  }

  public setProductDescription(descriptionHtml: string): void {
    this.productDescription = descriptionHtml;
    this.createProductStateService.setProductDescription(descriptionHtml);
  }
}
