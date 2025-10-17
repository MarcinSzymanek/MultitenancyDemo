import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import type { TenantRequest } from 'src/shared/types/requestTypes';
import { CreateUserApiDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(
    @Body() createUserDto: CreateUserApiDto,
    @Req() request: TenantRequest,
  ) {
    const dto = { tenantId: request.tenantId, ...createUserDto };
    return this.usersService.create(dto);
  }

  @Get()
  @UseGuards(AdminGuard)
  findAll(@Req() request: TenantRequest) {
    return this.usersService.findAll(request.tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
