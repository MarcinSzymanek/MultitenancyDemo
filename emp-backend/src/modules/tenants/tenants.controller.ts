import {
  Body,
  Controller,
  Get,
  Injectable,
  Logger,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { Tenant } from 'generated/prisma';
import { CreateUserReturn } from '../users/dto/create-user.dto';
import { CreateTenantDto } from './dto/tenant.dto';
import { TenantsService } from './tenants.service';

@Controller('tenants')
@Injectable()
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}
  @Post()
  create(@Body() tenantDto: CreateTenantDto): Promise<CreateUserReturn> {
    Logger.debug(tenantDto);
    return this.tenantsService.create(tenantDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Tenant> {
    const result = await this.tenantsService.findById(id);
    if (!result) {
      throw new NotFoundException("Record doesn't exist");
    }
    return result;
  }
}
