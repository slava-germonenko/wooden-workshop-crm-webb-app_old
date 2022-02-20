import {
  ChangeDetectionStrategy,
  OnInit,
  Component,
  HostBinding,
} from '@angular/core';
import { map } from 'rxjs';

import { IProduct } from '@common/interfaces';

import { BASIC_PRODUCT_INFORMATION_CONTROLS, mapToBasicInformation } from '@app/products/common';
import { CreateProductStateService } from '../create-product-state.service';

@Component({
  selector: 'ww-basic-product-information',
  templateUrl: 'product-basic-information.component.html',
  styleUrls: ['product-basic-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductBasicInformationComponent implements OnInit {
  @HostBinding('class')
  public hostClasses = ['full-size', 'pad-page-content', 'place-center'];

  public readonly basicInformationFormControls = [...BASIC_PRODUCT_INFORMATION_CONTROLS];

  public basicProductInformation: Pick<IProduct, 'englishName' | 'russianName' | 'vendorCode'>;

  public constructor(
    private readonly createProductStateService: CreateProductStateService,
  ) {
    this.basicProductInformation = mapToBasicInformation(this.createProductStateService.productModelSnapshot);
  }

  public ngOnInit(): void {
    this.createProductStateService.productModel$
      .pipe(
        map(mapToBasicInformation),
      )
      .subscribe();
  }

  public setBasicProductInformation(basicInfo: Record<string, any>): void {
    this.createProductStateService.setProductBasicInformation(
      basicInfo as Pick<IProduct, 'englishName' | 'russianName' | 'vendorCode'>,
    );
  }
}
