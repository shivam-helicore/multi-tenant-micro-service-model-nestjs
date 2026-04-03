import { Injectable } from '@nestjs/common';

@Injectable()
export class RbacService {
  /**
   * Placeholder permission check.
   * Replace with tenant-aware policy evaluation when wiring up real RBAC.
   */
  canAccess(): boolean {
    return true;
  }
}

