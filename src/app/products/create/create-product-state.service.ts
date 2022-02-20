import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  map,
  pluck,
  shareReplay,
  switchMap,
} from 'rxjs';

import { DEFAULT_PAGE } from '@common/constants';
import { IProductSize, IStepperStep } from '@common/interfaces';
import { ICategory, IMaterial, IProduct } from '@common/interfaces/models';
import { CategoriesListService, MaterialsListService } from '@common/services';

import * as STEPS from '@app/products/common/constants/create-products-step-indexes';
import {
  productBasicInformationIsValid,
  productSizeIsValid,
  CreateProductStepIndex,
  ProductsService,
  DEFAULT_PRODUCT,
  CREATE_PRODUCT_STEP_DEFAULTS,
  STEP_ROUTES,
} from '../common';

@Injectable()
export class CreateProductStateService {
  private readonly currentStepSource = new BehaviorSubject<CreateProductStepIndex>(STEPS.BASIC_STEP);

  private readonly materialsSearchSource = new BehaviorSubject<string>('');

  private readonly productModelSource = new BehaviorSubject<IProduct>({ ...DEFAULT_PRODUCT });

  private readonly stepsSource = new BehaviorSubject<ArrayLike<IStepperStep>>(CREATE_PRODUCT_STEP_DEFAULTS);

  public readonly currentStep$ = this.currentStepSource.asObservable();

  public readonly materials$ = this.materialsSearchSource.pipe(
    distinctUntilChanged(),
    switchMap((search) => this.materialsListService.getMaterialsPage(DEFAULT_PAGE, search)),
    pluck('items'),
    shareReplay(1),
  );

  public readonly productModel$ = this.productModelSource.asObservable();

  public readonly steps$ = this.stepsSource.asObservable();

  public readonly productIsValid$: Observable<boolean> = this.productModelSource.pipe(
    map(() => true),
  );

  public get currentStepIndexSnapshot(): CreateProductStepIndex {
    return this.currentStepSource.value;
  }

  public get productModelSnapshot(): IProduct {
    return this.productModelSource.value;
  }

  public get stepsSnapshot(): ArrayLike<IStepperStep> {
    return this.stepsSource.value;
  }

  public constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly categoriesListService: CategoriesListService,
    private readonly materialsListService: MaterialsListService,
    private readonly productsService: ProductsService,
    private readonly router: Router,
  ) { }

  public saveProduct(): void {
    this.productsService.saveProductDetails(this.productModelSnapshot)
      // TODO: Save assets, product prices, social links etc..
      .pipe()
      .subscribe();
  }

  public setMaterialsSearch(search: string): void {
    this.materialsSearchSource.next(search);
  }

  public setProductBasicInformation(
    basicInformation: Pick<IProduct, 'russianName' | 'englishName' | 'vendorCode'>,
  ): void {
    this.pathProduct({ ...basicInformation });
    this.setStepCompletedStatus(STEPS.BASIC_STEP, productBasicInformationIsValid(basicInformation));
  }

  public setProductCategory(category: ICategory): void {
    this.pathProduct({ category, categoryId: category.id });
  }

  public setProductDescription(description: string): void {
    this.pathProduct({ description });
    this.setStepCompletedStatus(STEPS.DESCRIPTION_STEP, true);
  }

  public setProductMaterial(material: IMaterial): void {
    this.pathProduct({ material, materialId: material.id });
  }

  public setProductTechSpecs(size: IProductSize, material?: IMaterial): void {
    this.pathProduct({ ...size, material, materialId: material?.id });
    this.setStepCompletedStatus(STEPS.TECH_SPECS_STEP, productSizeIsValid(size));
  }

  public setCurrentStep(stepIndex: CreateProductStepIndex): void {
    const stepRouteUrl = STEP_ROUTES[stepIndex];
    this.router.navigate([stepRouteUrl])
      .then(() => this.currentStepSource.next(stepIndex));
  }

  private pathProduct(productPatch: Partial<IProduct>): void {
    const productModel = this.productModelSnapshot;
    this.productModelSource.next({ ...productModel, ...productPatch });
  }

  private setStepCompletedStatus(stepIndex: CreateProductStepIndex, completed: boolean): void {
    const steps = this.stepsSnapshot;
    steps[stepIndex].completed = completed;
    this.stepsSource.next({ ...steps });
  }
}
