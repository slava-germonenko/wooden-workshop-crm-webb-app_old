import {
  ComponentRef,
  Directive,
  Input,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';

import { LoadingComponent } from './loading.component';
import { DEFAULT_LOADER_DIAMETER, DEFAULT_LOADER_STROKE_WIDTH } from './constants';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[loading]',
})
export class LoadingDirective {
  private loaderComponentRef: ComponentRef<LoadingComponent> | null = null;

  private loaderDiameter = DEFAULT_LOADER_DIAMETER;

  private loaderStrokeWidth = DEFAULT_LOADER_STROKE_WIDTH;

  @Input()
  public set loading(loading: boolean) {
    if (loading) {
      this.addLoadingState();
    } else {
      this.removeLoadingState();
    }
  }

  @Input()
  public set diameter(diameter: number) {
    this.loaderDiameter = diameter;
    if (this.loaderComponentRef) {
      this.loaderComponentRef.instance.loaderDiameter = diameter;
    }
  }

  @Input()
  public set strokeWidth(strokeWidth: number) {
    this.loaderStrokeWidth = strokeWidth;
    if (this.loaderComponentRef) {
      this.loaderComponentRef.instance.loaderStrokeWidth = strokeWidth;
    }
  }

  public constructor(
    private readonly containerRef: ViewContainerRef,
    private readonly renderer: Renderer2,
  ) { }

  private addLoadingState(): void {
    this.removeLoadingState();

    this.loaderComponentRef = this.containerRef.createComponent(LoadingComponent);
    this.loaderComponentRef.instance.loaderStrokeWidth = this.loaderStrokeWidth;
    this.loaderComponentRef.instance.loaderDiameter = this.loaderDiameter;

    this.renderer.appendChild(
      this.containerRef.element.nativeElement,
      this.loaderComponentRef.location.nativeElement,
    );
  }

  private removeLoadingState(): void {
    if (this.loaderComponentRef === null) {
      return;
    }

    this.renderer.removeChild(
      this.containerRef.element.nativeElement,
      this.loaderComponentRef.location.nativeElement,
    );
  }
}
