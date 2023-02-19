import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { createReadStream } from 'fs';
import * as fs from 'fs/promises';
import { userInfo } from 'os';
import path from 'path';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../current-user.decorator';
import { DatabaseService } from '../global/database.service';
import { Role } from '../role';
import { MessageDto } from './message.dto';

const dir = 'user-data/';

@Controller('message')
export class MessageController {
  constructor(private readonly db: DatabaseService) {}

  @UseGuards(AuthGuard)
  @Get()
  async messages(@CurrentUser() user: User) {
    if (user.role === Role.COMPANY) {
      const companyName = await this.getCompanyName(user);
      return await fs.readdir(path.join(dir, companyName));
    } else {
      return (await fs.readdir(dir)).filter((fn) => !fn.startsWith('.'));
    }
  }

  @UseGuards(AuthGuard)
  @Get('company/:companyName')
  async messagesForCompany(
    @CurrentUser() user: User | undefined,
    @Param('companyName') companyName: string
  ) {
    if (user.role !== 'ADMIN') {
      throw new HttpException('Only allowed for admin', HttpStatus.FORBIDDEN);
    }
    return await fs.readdir(path.join(dir, companyName));
  }

  @Post()
  async save(
    @CurrentUser() user: User | undefined,
    @Body() message: MessageDto
  ) {
    const timestamp = new Date().toISOString();
    const filename = `${timestamp}_${message.from}.html`;
    const companyName = (await this.getCompanyName(user)) ?? 'Unknown';
    fs.writeFile(path.join(dir, companyName, filename), message.content);
    return 'OK';
  }

  @UseGuards(AuthGuard)
  @Get(':filename(*)')
  async message(
    @CurrentUser() user: User | undefined,
    @Param('filename') filename: string
  ) {
    const companyName = (await this.getCompanyName(user)) ?? 'Unknown';
    const file = createReadStream(path.join(dir, companyName, filename));
    return new StreamableFile(file);
  }

  private async getCompanyName(user?: User) {
    return (
      await this.db.company.findFirst({
        where: { id: user?.companyId },
        rejectOnNotFound: false,
      })
    ).name;
  }
}
