import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  SetMetadata,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from '../guards/jwt.auth-guard';

export const ROLES_KEY = 'roles';
export const ForRole = (...roles: string[]) =>
  applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );

export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () =>
      roles.some((role) => user.profile.roles.includes(role));
    if (!(user && user.profile && hasRole())) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
