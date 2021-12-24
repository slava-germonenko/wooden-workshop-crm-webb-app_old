import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  OnDestroy,
  EventEmitter,
  Component,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { filter, startWith, Subscription } from 'rxjs';

@Component({
  selector: 'ww-autocomplete',
  templateUrl: 'autocomplete.component.html',
  styleUrls: ['autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnDestroy {
  private formControlValueChangeSubscription: Subscription | null = null;

  public controlInner: FormControl = new FormControl();

  @Input()
  public set control(control: FormControl) {
    this.controlInner = control;
    this.destroySubscription();
    this.formControlValueChangeSubscription = control.valueChanges
      .pipe(
        startWith(''),
        filter((value) => typeof value === 'string'),
      )
      .subscribe((value) => this.searchChanged.emit(value));
  }

  @Input()
  public appearance: MatFormFieldAppearance = 'standard';

  @Input()
  public displayWith?: (item: any) => string;

  @Input()
  public label?: string;

  @Input()
  public multiple = false;

  @Input()
  public options: any[] = [];

  @Input()
  public placeholder = '';

  @Input()
  public selectedItems: any[] = [];

  @Input()
  public separatorKey = [ENTER, COMMA];

  @Output()
  public optionSelected = new EventEmitter();

  @Output()
  public optionRemoved = new EventEmitter();

  @Output()
  public searchChanged = new EventEmitter<string>();

  public get availableOptions(): any[] {
    if (!this.selectedItems.length) {
      return this.options;
    }

    return this.multiple ? this.options : [];
  }

  public get currentPlaceholder(): string {
    if (!this.selectedItems.length) {
      return this.placeholder;
    }

    return this.multiple ? this.placeholder : '';
  }

  public ngOnDestroy(): void {
    this.destroySubscription();
  }

  private destroySubscription(): void {
    this.formControlValueChangeSubscription?.unsubscribe();
    this.formControlValueChangeSubscription = null;
  }
}
