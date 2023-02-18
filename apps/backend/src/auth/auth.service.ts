import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import bcrypt from 'bcrypt';
import md5 from 'md5';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private jwtService: JwtService
  ) {}

  async login({ email, password }: { email: string; password: string }) {
    const query = `SELECT * FROM User WHERE email = "${email}";`;
    const users = await this.db.$queryRawUnsafe<User[]>(query);
    if (users.length != 1) {
      throw Error(`No match found for user ${email} !`);
    }
    const user = users[0];
    console.log(user);

    if (await bcrypt.compare(password, user.passwordHash)) {
      return this.jwtService.sign(user);
    } else if (md5(password) === user.passwordHash) {
      return this.jwtService.sign(user);
    } else {
      return null;
    }
  }
}
