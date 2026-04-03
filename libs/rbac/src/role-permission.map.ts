import { Permission } from './permissions.enum';
import { Role } from './roles.enum';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.TENANT_ADMIN]: [Permission.READ, Permission.WRITE],
  [Role.USER]: [Permission.READ],
};

