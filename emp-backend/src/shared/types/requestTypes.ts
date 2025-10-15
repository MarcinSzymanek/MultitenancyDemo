import { Request } from 'express';
import { $Enums } from 'generated/prisma';
import { JwtPayload } from 'jwt-decode';

export interface UserJwtPayload extends JwtPayload {
  tenantId: string;
  email: string;
  role: $Enums.Role;
}

export interface TenantRequest extends Request {
  tenantId: string;
  email: string;
  role: $Enums.Role;
}
