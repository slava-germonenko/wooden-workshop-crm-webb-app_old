import { IStepperStep } from '@common/interfaces';

import * as STEPS from '@app/products/common/constants/create-products-step-indexes';
import { CREATE_PRODUCT_STEP_LABELS } from '@app/products/common';

export const CREATE_PRODUCT_STEP_DEFAULTS: ArrayLike<IStepperStep> = {
  length: 5,
  [STEPS.BASIC_STEP]: {
    name: CREATE_PRODUCT_STEP_LABELS[STEPS.BASIC_STEP],
    stepIndex: STEPS.BASIC_STEP,
    completed: false,
    hasError: false,
  },
  [STEPS.DESCRIPTION_STEP]: {
    name: CREATE_PRODUCT_STEP_LABELS[STEPS.DESCRIPTION_STEP],
    stepIndex: STEPS.DESCRIPTION_STEP,
    completed: false,
    hasError: false,
  },
  [STEPS.TECH_SPECS_STEP]: {
    name: CREATE_PRODUCT_STEP_LABELS[STEPS.TECH_SPECS_STEP],
    stepIndex: STEPS.TECH_SPECS_STEP,
    completed: false,
    hasError: false,
  },
  [STEPS.TRADING_DATA_STEP]: {
    name: CREATE_PRODUCT_STEP_LABELS[STEPS.TRADING_DATA_STEP],
    stepIndex: STEPS.TRADING_DATA_STEP,
    completed: false,
    hasError: false,
  },
  [STEPS.ASSETS_STEP]: {
    name: CREATE_PRODUCT_STEP_LABELS[STEPS.ASSETS_STEP],
    stepIndex: STEPS.ASSETS_STEP,
    completed: false,
    hasError: false,
  },
};
