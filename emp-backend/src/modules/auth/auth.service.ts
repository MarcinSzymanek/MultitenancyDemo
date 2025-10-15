import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, SignupDto } from './dto/auth.dto';

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
      where: { email: dto.email },
    });
    if (user === null)
      throw new HttpException(UserOrPasswordErrorMsg, HttpStatus.FORBIDDEN);

    const passwordMatches = await argon.verify(user.pwdhash, dto.password);
    if (!passwordMatches)
      throw new HttpException(UserOrPasswordErrorMsg, HttpStatus.FORBIDDEN);

    return this.signToken(user.id, user.email);
  }

  async signup(dto: SignupDto): Promise<{ access_token: string }> {
    const userFound = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });
    if (userFound !== null)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);

    const hash = await argon.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        tenant: {
          connect: {
            id: dto.tenantId,
          },
        },
        email: dto.email,
        pwdhash: hash,
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
    });

    if (user === null)
      throw new InternalServerErrorException('Failed to create user');

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ userId: number; access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '360m',
      secret: this.jwtSecret,
    });

    return { userId: userId, access_token: token };
  }
}
