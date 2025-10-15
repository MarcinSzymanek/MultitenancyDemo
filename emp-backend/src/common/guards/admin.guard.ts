import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
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
    Logger.debug(req);
    if (req.role != $Enums.Role.ADMIN) return false;
    return true;
  }
}
