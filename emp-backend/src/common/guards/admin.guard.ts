import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { $Enums } from 'generated/prisma';
import { Observable } from 'rxjs';
import { TenantRequest } from 'src/shared/types/requestTypes';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<TenantRequest>();
    Logger.debug('GETTING TENANT REQ');
    // Logger.debug(req);
    console.log(req.role);
    if (req.role != $Enums.Role.ADMIN)
      throw new UnauthorizedException('Admin permissions required');
    return true;
  }
}
