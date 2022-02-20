import { IDynamicFormField } from '@framework/dynamic-form';
import { createMinValidator, createRequiredValidator } from '@common/helper-functions';

export const BASIC_PRODUCT_INFORMATION_CONTROLS: IDynamicFormField[] = [
  {
    name: 'russianName',
    label: 'Наименование на русском',
    type: 'text',
    validators: createRequiredValidator('наименование на русском'),
  },
  {
    name: 'englishName',
    label: 'Наименование на английском',
    type: 'text',
    validators: createRequiredValidator('наименование на английском'),
  },
  {
    name: 'vendorCode',
    label: 'Артикул',
    type: 'text',
    placeholder: 'Прим. АА-0000',
    validators: createRequiredValidator('артикул'),
  },
];

export const PRODUCT_SIZE_CONTROLS: IDynamicFormField[] = [
  {
    name: 'width',
    label: 'Ширина',
    type: 'number',
    placeholder: 'Ширина, мм.',
    validators: [
      createRequiredValidator('ширину'),
      createMinValidator(1, 'Ширина должна быть больше 1 мм.'),
    ],
  },
  {
    name: 'height',
    label: 'Высота',
    type: 'number',
    placeholder: 'Высота, мм.',
    validators: [
      createRequiredValidator('высоту'),
      createMinValidator(1, 'Высота должна быть больше 1 мм.'),
    ],
  },
  {
    name: 'depth',
    label: 'Толщина',
    type: 'number',
    placeholder: 'Толщина, мм.',
    validators: [
      createRequiredValidator('толщину'),
      createMinValidator(1, 'Толщина должна быть больше 1 мм.'),
    ],
  },
];
