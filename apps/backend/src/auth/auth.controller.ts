import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CredentialsDto } from './credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  async login(
    @Body() credentials: CredentialsDto,
    @Res({ passthrough: true }) response: Response
  ) {
    try {
      const token = await this.service.login(credentials);
      response.cookie('TOKEN', token);
      return token ? 'OK' : 'ERROR';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
