import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const jwt_secret = process.env.JWT_SECRET;
if (!jwt_secret)
  throw new Error('Error initializing autmodule: No jwt secret found');

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwt_secret,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
