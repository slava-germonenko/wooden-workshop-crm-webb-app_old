import * as STEPS from '@app/products/common';
import { CreateProductStepIndex } from '@app/products/common';

export const CREATE_PRODUCT_STEP_LABELS: Record<CreateProductStepIndex, string> = {
  [STEPS.BASIC_STEP]: 'Базовая информация',
  [STEPS.DESCRIPTION_STEP]: 'Описание',
  [STEPS.TECH_SPECS_STEP]: 'Технические характеристики',
  [STEPS.TRADING_DATA_STEP]: 'Торговая информация',
  [STEPS.ASSETS_STEP]: 'Ассеты',
};
