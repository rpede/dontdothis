import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { createReadStream } from 'fs';
import * as fs from 'fs/promises';
import path from 'path';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../current-user.decorator';
import { DatabaseService } from '../global/database.service';
import { MessageDto } from './message.dto';

const dir = 'user-data/';

@Controller('message')
export class MessageController {
  constructor(private readonly db: DatabaseService) {}

  @UseGuards(AuthGuard)
  @Get()
  async messages() {
    return await fs.readdir(dir);
  }

  @Post()
  async save(@Body() message: MessageDto) {
    const timestamp = new Date().toISOString();
    const filename = `${timestamp}_${message.from}.html`;
    fs.writeFile(path.join(dir, filename), message.content);
    return 'OK';
  }

  @UseGuards(AuthGuard)
  @Get(':filename(*)')
  async message(
    @CurrentUser() user: User,
    @Param('filename') filename: string
  ) {
    const companyName =
      (
        await this.db.company.findFirst({
          where: { id: user.companyId },
          rejectOnNotFound: false,
        })
      ).name ?? 'Unknown';
    const file = createReadStream(path.join(dir, companyName, filename));
    return new StreamableFile(file);
  }
}
