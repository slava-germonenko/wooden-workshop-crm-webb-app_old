import * as STEPS from '../constants/create-products-step-indexes';

export type CreateProductStepIndex = typeof STEPS.BASIC_STEP
  | typeof STEPS.DESCRIPTION_STEP
  | typeof STEPS.TECH_SPECS_STEP
  | typeof STEPS.TRADING_DATA_STEP
  | typeof STEPS.ASSETS_STEP;
