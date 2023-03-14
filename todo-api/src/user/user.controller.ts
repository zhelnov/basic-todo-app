import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SignupDto } from './dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user/signup')
  async signup(@Body() dto: SignupDto) {
    return this.userService.signup(dto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('user/login')
  async login(@Request() req: any) {
    return this.userService.login(req.user);
  }
}
