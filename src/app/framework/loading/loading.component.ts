import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

import { DEFAULT_LOADER_DIAMETER, DEFAULT_LOADER_STROKE_WIDTH } from './constants';

@Component({
  selector: 'ww-loading',
  templateUrl: 'loading.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  @HostBinding('class')
  public hostClasses = [
      'full-zie',
      'place-center',
      'cdk-overlay-backdrop',
      'cdk-overlay-backdrop-showing',
      'cdk-overlay-dark-backdrop',
    ];

  @Input()
  public loaderDiameter = DEFAULT_LOADER_DIAMETER;

  @Input()
  public loaderStrokeWidth = DEFAULT_LOADER_STROKE_WIDTH;
}
