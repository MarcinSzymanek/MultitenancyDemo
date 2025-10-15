import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { jwtDecode } from 'jwt-decode';
import { ExtractJwt } from 'passport-jwt';
import { UserJwtPayload, TenantRequest } from 'src/shared/types/requestTypes';

@Injectable()
export class UidExtractorMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (!token) {
      next();
      return;
    }

    const data = jwtDecode<UserJwtPayload>(token);
    const tenantReq = req as TenantRequest;
    if (data.tenantId) tenantReq.tenantId = data.tenantId;
    if (data.email) tenantReq.email = data.email;
    if (data.role) tenantReq.role = data.role;

    next();
  }
}
