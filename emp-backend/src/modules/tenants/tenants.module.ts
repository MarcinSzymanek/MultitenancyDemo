import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';

@Module({
  providers: [TenantsService, UsersService],
  controllers: [TenantsController],
})
export class TenantsModule {}
