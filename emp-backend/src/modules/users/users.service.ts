import { Injectable } from '@nestjs/common';
import argon from 'argon2';
import type { User } from 'generated/prisma';
import { $Enums } from 'generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto } from './dto/get-users.dto';

function userToGetUsersDto(user: User): GetUsersDto {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isAdmin: user.role == $Enums.Role.ADMIN ? true : false,
  };
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const hash = await argon.hash(dto.password);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { pwdhash, ...user } = await this.prisma.user.create({
      data: {
        tenant: {
          connect: {
            id: dto.tenantId,
          },
        },
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        pwdhash: hash,
        role: dto.isAdmin ? $Enums.Role.ADMIN : $Enums.Role.USER,
      },
    });

    return user;
  }

  async findAll(tenantId: string): Promise<GetUsersDto[]> {
    const users = await this.prisma.user.findMany({
      where: { tenantId: tenantId },
    });
    const dtos = users.map((user) => userToGetUsersDto(user));
    console.log(dtos);
    return dtos;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
