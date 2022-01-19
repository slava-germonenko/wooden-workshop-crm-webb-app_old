import { Permissions } from '@common/enums';

const permissionCodes = Object.values(Permissions);

export function isPermission(objToCheck: unknown): objToCheck is Permissions {
  if (typeof objToCheck !== 'string') {
    return false;
  }

  return permissionCodes.some((permission) => permission === objToCheck);
}
