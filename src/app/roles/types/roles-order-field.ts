import { IRole } from '@common/interfaces';

export type RolesOrderField = keyof Omit<IRole, 'id' | 'permissions'>;
