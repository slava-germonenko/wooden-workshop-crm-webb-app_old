import {
  ChangeDetectionStrategy,
  OnInit,
  Component,
  HostBinding,
} from '@angular/core';

import { displayName } from '@common/helper-functions';
import { IMaterial, IProductSize } from '@common/interfaces';

import { CreateProductStateService } from '@app/products/create/create-product-state.service';
import { mapToProductSize, PRODUCT_SIZE_CONTROLS } from '@app/products/common';

@Component({
  selector: 'ww-product-tech-specs',
  templateUrl: 'product-tech-specs.component.html',
  styleUrls: ['product-tech-specs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTechSpecsComponent implements OnInit {
  @HostBinding('class')
  public hostClasses = ['full-size', 'pad-page-content', 'place-center'];

  public readonly availableMaterials$ = this.createProductStateService.materials$;

  public readonly productSizeFormControls = [...PRODUCT_SIZE_CONTROLS];

  public displayName = displayName;

  public productSize: IProductSize = { height: 0, width: 0, depth: 0 };

  public selectedMaterial: [IMaterial] | [] = [];

  public constructor(private readonly createProductStateService: CreateProductStateService) { }

  public ngOnInit(): void {
    this.createProductStateService.setProductTechSpecs(this.productSize);
    this.createProductStateService.productModel$
      .subscribe((product) => {
        this.productSize = mapToProductSize(product);
        this.selectedMaterial = product.material ? [product.material] : [];
      });
  }

  public setMaterialsSearch(search: string): void {
    this.createProductStateService.setMaterialsSearch(search);
  }

  public setProductMaterial(material?: IMaterial): void {
    const product = this.createProductStateService.productModelSnapshot;
    this.createProductStateService.setProductTechSpecs(mapToProductSize(product), material);
  }

  public setProductSize(size: Record<string, any>): void {
    const product = this.createProductStateService.productModelSnapshot;
    this.createProductStateService.setProductTechSpecs(size as IProductSize, product.material);
  }
}
