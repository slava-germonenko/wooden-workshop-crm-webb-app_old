import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ICategory } from '@common/interfaces';

import { CreateProductStateService } from '@app/products/create/create-product-state.service';

@Component({
  selector: 'ww-product-trading-info',
  templateUrl: 'product-trading-info.component.html',
  styleUrls: ['product-trading-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTradingInfoComponent {
  public availableMaterials$ = this.createProductStateService.categories$;

  public constructor(private readonly createProductStateService: CreateProductStateService) { }

  public setProductCategory(category?: ICategory): void {
    this.createProductStateService.setProductCategory(category);
  }
}
