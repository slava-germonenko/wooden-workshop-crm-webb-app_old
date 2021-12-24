import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wwFullName',
})
export class FullNamePipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  public transform(person: { firstName: string, lastName: string } | undefined | null): string | null {
    return person ? `${person.firstName} ${person.lastName}` : null;
  }
}
