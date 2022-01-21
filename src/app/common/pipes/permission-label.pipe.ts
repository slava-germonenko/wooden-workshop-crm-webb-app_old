import { Pipe, PipeTransform } from '@angular/core';

import { PERMISSION_LABELS } from '@common/constants';
import { Permissions } from '@common/enums';

@Pipe({
  name: 'permissionLabel',
})
export class PermissionLabelPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  public transform(permission: Permissions): string {
    return PERMISSION_LABELS[permission];
  }
}
