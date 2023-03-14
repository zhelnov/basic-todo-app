import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
  Request,
  Get,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

import { CreateTodoDto } from './dto';

@Controller('todo')
@UseGuards(AuthGuard('jwt'))
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreateTodoDto) {
    return this.appService.create(req.user.id, dto);
  }

  @Patch(':id/complete')
  complete(@Request() req: any, @Param('id') id: string) {
    return this.appService.checkmark(req.user.id, id, true);
  }

  @Patch(':id/uncomplete')
  uncomplete(@Request() req: any, @Param('id') id: string) {
    return this.appService.checkmark(req.user.id, id, false);
  }

  @Delete(':id')
  delete(@Request() req: any, @Param('id') id: string) {
    return this.appService.delete(req.user.id, id);
  }

  @Get()
  getOwn(@Request() req: any) {
    return this.appService.find(req.user.id);
  }
}
