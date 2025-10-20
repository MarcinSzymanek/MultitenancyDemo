import {
  Body,
  Controller,
  HttpException,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() dto: LoginDto) {
    try {
      const token = await this.authService.login(dto);
      return token;
    } catch (error) {
      console.error(error);
      if (!(error instanceof HttpException)) {
        throw new InternalServerErrorException();
      }
      throw error;
    }
  }
}
