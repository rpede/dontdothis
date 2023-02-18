import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { DatabaseService } from '../global/database.service';

@Controller("company")
export class CompanyController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  companies() {
    return this.db.company.findMany();
  }

  @Get(':id')
  company(@Param('id', ParseIntPipe) id: number) {
    return this.db.company.findUnique({
      where: { id },
      include: {
        users: { select: { id: true, name: true, email: true, role: true } },
      },
    });
  }
}
