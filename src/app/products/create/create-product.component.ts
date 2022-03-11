import {
  ChangeDetectionStrategy,
  OnInit,
  ViewEncapsulation,
  Component,
} from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

import * as STEPS from '@app/products/common/constants/create-products-step-indexes';
import { CreateProductStateService } from './create-product-state.service';
import { CREATE_PRODUCT_STEP_LABELS, isCreateProductStepIndex } from '../common';

@Component({
  selector: 'ww-create-product',
  templateUrl: 'create-product.component.html',
  styleUrls: ['create-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [CreateProductStateService],
})
export class CreateProductComponent implements OnInit {
  public readonly currentStep$ = this.createProductStateService.currentStep$
    .pipe(
      tap((stepIndex) => { this.currentStepLabel = CREATE_PRODUCT_STEP_LABELS[stepIndex]; }),
    );

  public readonly productIsValid$ = this.createProductStateService.productIsValid$;

  public steps = Array.from(this.createProductStateService.stepsSnapshot);

  public prevStepLabel = 'Выйти';

  public nextStepLabel = 'Далее';

  public currentStepLabel = CREATE_PRODUCT_STEP_LABELS[this.createProductStateService.currentStepIndexSnapshot];

  public constructor(
    private readonly createProductStateService: CreateProductStateService,
    private readonly router: Router,
  ) { }

  public ngOnInit(): void {
    this.createProductStateService.steps$
      .subscribe((steps) => { this.steps = Array.from(steps); });

    this.createProductStateService.currentStep$
      .subscribe((stepIndex) => {
        this.prevStepLabel = stepIndex === STEPS.BASIC_STEP ? 'Выйти' : 'Назад';
        this.nextStepLabel = stepIndex === STEPS.ASSETS_STEP ? 'Сохранить' : 'Далее';
      });

    // Always redirect to the first step
    // until we implement kind of persistence
    // for product drafts
    this.createProductStateService.setCurrentStep(STEPS.BASIC_STEP);
  }

  public nextStepClick(): void {
    const currentStepIndex = this.createProductStateService.currentStepIndexSnapshot;
    if (currentStepIndex === STEPS.ASSETS_STEP) {
      this.createProductStateService.saveProduct();
    } else {
      this.setSelectedStep(currentStepIndex + 1);
    }
  }

  public prevStepClick(): void {
    const currentStepIndex = this.createProductStateService.currentStepIndexSnapshot;
    if (currentStepIndex === STEPS.BASIC_STEP) {
      this.router.navigate(['products']);
    } else {
      this.setSelectedStep(currentStepIndex - 1);
    }
  }

  public setSelectedStep(stepIndex: number): void {
    if (isCreateProductStepIndex(stepIndex)) {
      this.createProductStateService.setCurrentStep(stepIndex);
    }
  }
}
