import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { $Enums } from 'generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/auth.dto';

const UserOrPasswordErrorMsg = 'User or password does not match';

@Injectable({})
export class AuthService {
  private jwtSecret: string;

  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
    config: ConfigService,
  ) {
    this.jwtSecret = config.getOrThrow<string>('JWT_SECRET');
  }

  async login(dto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findFirst({
      where: { email: dto.email, tenantId: dto.tenantId },
    });
    if (user === null)
      throw new HttpException(UserOrPasswordErrorMsg, HttpStatus.FORBIDDEN);

    const passwordMatches = await argon.verify(user.pwdhash, dto.password);
    if (!passwordMatches)
      throw new HttpException(UserOrPasswordErrorMsg, HttpStatus.FORBIDDEN);

    return this.signToken(dto.tenantId, user.email, user.role);
  }

  async signToken(
    tenantId: string,
    email: string,
    role: $Enums.Role,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: tenantId,
      tenantId,
      email,
      role,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '360m',
      secret: this.jwtSecret,
    });

    return { access_token: token };
  }
}
