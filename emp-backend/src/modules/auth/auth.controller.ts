import {
  Body,
  Controller,
  HttpException,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() dto: LoginDto) {
    try {
      const token = await this.authService.login(dto);
      return token;
    } catch (error) {
      if (!(error instanceof HttpException)) {
        throw new InternalServerErrorException();
      }
      throw error;
    }
  }

  @UseGuards(AdminGuard)
  @Post('signup')
  async signUp(@Body() dto: SignupDto) {
    try {
      await this.authService.signup(dto);
    } catch (error) {
      if (!(error instanceof HttpException)) {
        throw new InternalServerErrorException();
      }
    }

    return 'Signup succesful';
  }
}
