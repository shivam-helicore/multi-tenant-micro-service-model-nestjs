import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { RbacService } from './rbac.service';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(
    private readonly rbacService: RbacService,
    private readonly reflector: Reflector = new Reflector(),
  ) {}

  canActivate(_context: ExecutionContext): boolean {
    // Placeholder: wire real RBAC policy evaluation using decorators + tenant context.
    return this.rbacService.canAccess();
  }
}

