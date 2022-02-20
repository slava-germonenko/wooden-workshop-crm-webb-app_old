import { ASSETS_STEP, BASIC_STEP, CreateProductStepIndex } from '@app/products/common';

export function isCreateProductStepIndex(index: number): index is CreateProductStepIndex {
  return index >= BASIC_STEP && index <= ASSETS_STEP;
}
