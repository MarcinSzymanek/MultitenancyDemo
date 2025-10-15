import { Injectable } from '@nestjs/common';
import { Tenant } from 'generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, CreateUserReturn } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { CreateTenantDto } from './dto/tenant.dto';

@Injectable()
export class TenantsService {
  constructor(
    private readonly userService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateTenantDto): Promise<CreateUserReturn> {
    const tenant = await this.prisma.tenant.create({
      data: {
        id: dto.tenantId,
      },
    });

    const newUser: CreateUserDto = {
      tenantId: tenant.id,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      isAdmin: true,
      password: dto.password,
    };
    return this.userService.create(newUser);
  }

  findById(id: string): Promise<Tenant | null> {
    return this.prisma.tenant.findUnique({
      where: {
        id: id,
      },
    });
  }
}
