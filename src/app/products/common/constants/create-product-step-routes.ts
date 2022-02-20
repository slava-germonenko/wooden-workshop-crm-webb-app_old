import { CreateProductStepIndex } from '@app/products/common';
import * as STEPS from './create-products-step-indexes';

export const STEP_ROUTES: Record<CreateProductStepIndex, string> = {
  [STEPS.BASIC_STEP]: '/products/create/basic',
  [STEPS.DESCRIPTION_STEP]: '/products/create/description',
  [STEPS.TECH_SPECS_STEP]: '/products/create/tech-specs',
  [STEPS.TRADING_DATA_STEP]: '/products/create/trading',
  [STEPS.ASSETS_STEP]: '/products/create/assets',
};
