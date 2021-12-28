import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wwWithPermissions',
})
export class WithPermissionsPipe implements PipeTransform {
  public transform(value: any, ...args: any[]): any {
  }
}
