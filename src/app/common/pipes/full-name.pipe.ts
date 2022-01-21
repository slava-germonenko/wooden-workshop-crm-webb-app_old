import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName',
})
export class FullNamePipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  public transform({ firstName, lastName }: { firstName: string, lastName: string }): string {
    return `${firstName} ${lastName}`;
  }
}
