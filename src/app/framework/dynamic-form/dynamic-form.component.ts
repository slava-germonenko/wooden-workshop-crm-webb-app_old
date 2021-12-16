import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormBuilder, FormControlStatus, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { IDynamicFormField, IDynamicFormFieldValidator } from './interfaces';

@Component({
  selector: 'ww-dynamic-form',
  templateUrl: 'dynamic-form.component.html',
  styleUrls: ['dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnDestroy {
  private formValueChangeSubscription: Subscription | null = null;

  private formStatusChangeSubscription: Subscription | null = null;

  @Input()
  public set fields(fields: IDynamicFormField[]) {
    this.fieldDefinitions = fields;
    this.form = this.buildForm(fields);
    this.cleanSubscriptions();
    this.formValueChangeSubscription = this.form.valueChanges
      .subscribe((val) => this.valueChange.emit(val));
    this.formStatusChangeSubscription = this.form.statusChanges
      .subscribe((status) => this.statusChange.emit(status));
  }

  @Input()
  public cancelButtonText = 'Отменить';

  @Input()
  public showCancel = false;

  @Input()
  public submitButtonText = 'Подтвердить';

  @Output()
  public showSubmit = true;

  @Input()
  public set value(valueObj: Record<string, any> | undefined | null) {
    if (this.form && valueObj) {
      this.setFormValue(valueObj);
    }
  }

  @Output()
  public valueChange = new EventEmitter<unknown>();

  @Output()
  public statusChange = new EventEmitter<FormControlStatus>();

  @Output()
  public formCancel = new EventEmitter<void>();

  @Output()
  public formSubmit = new EventEmitter<unknown>();

  public fieldDefinitions: IDynamicFormField[] = [];

  public form?: FormGroup;

  public constructor(private readonly fb: FormBuilder) { }

  public getErrorMessage(filed: IDynamicFormField): string | null {
    if (!this.form) {
      return null;
    }

    if (!filed.validators) {
      return null;
    }

    const controlErrors = this.form.controls[filed.name]?.errors;
    if (!controlErrors) {
      return null;
    }

    const errorKeys: string[] = Object.keys(controlErrors);
    if (!errorKeys.length) {
      return null;
    }

    if (Array.isArray(filed.validators) && filed.validators.length) {
      return filed.validators.find((v) => v.code === errorKeys[0])?.message ?? null;
    }

    return (filed.validators as IDynamicFormFieldValidator).message ?? null;
  }

  public ngOnDestroy(): void {
    this.cleanSubscriptions();
  }

  private buildForm(fields: IDynamicFormField[]): FormGroup {
    const controls: Record<string, any> = {};

    fields.forEach((field) => {
      const validators = Array.isArray(field.validators)
        ? field.validators.map((v) => v.func)
        : field.validators;
      controls[field.name] = [field.value, validators];
    });

    return this.fb.group(controls);
  }

  private cleanSubscriptions(): void {
    this.formValueChangeSubscription?.unsubscribe();
    this.formValueChangeSubscription = null;
    this.formStatusChangeSubscription?.unsubscribe();
    this.formStatusChangeSubscription?.unsubscribe();
  }

  private setFormValue(valueObj: Record<string, any>): void {
    Object.keys(valueObj).forEach((controlName) => {
      this.form?.controls[controlName]?.setValue(valueObj[controlName]);
    });
  }
}
