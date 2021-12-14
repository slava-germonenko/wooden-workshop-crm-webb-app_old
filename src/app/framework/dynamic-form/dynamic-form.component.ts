import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { IDynamicFormField } from './interfaces';

@Component({
  selector: 'ww-dynamic-form',
  templateUrl: 'dynamic-form.component.html',
  styleUrls: ['dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent {
  @Input()
  public set fields(fields: IDynamicFormField[]) {
    this.form = this.buildForm(fields);
    this.fieldDefinitions = fields;
  }

  public fieldDefinitions: IDynamicFormField[] = [];

  public form?: FormGroup;

  public constructor(private readonly fb: FormBuilder) { }

  public getFieldErrorMessages(field: IDynamicFormField): { code: string, message: string }[] {
    if (Array.isArray(field.validators)) {
      return field.validators
        .filter((v) => !!v.message && !!v.code)
        .map((v) => ({ message: v.message!, code: v.code! }));
    }

    if (field.validators && field.validators.message && field.validators.code) {
      return [{ message: field.validators.message, code: field.validators.code }];
    }

    return [];
  }

  private buildForm(fields: IDynamicFormField[]): FormGroup {
    const controls: Record<string, any> = {};

    fields.forEach((field) => {
      controls[field.name] = [field.value, field.validators];
    });

    return this.fb.group(controls);
  }
}
