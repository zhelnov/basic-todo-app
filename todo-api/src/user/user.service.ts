import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';

import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { SignupDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    return this.userRepo.save({
      ...dto,
      passwordHash: this.getMd5Hex(dto.password),
    });
  }

  async validateUser(email: string, password: string) {
    const found = await this.userRepo.findOne({
      where: {
        email,
        passwordHash: this.getMd5Hex(password),
      },
    });
    if (found) {
      const { passwordHash, ...user } = found;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  protected getMd5Hex(str: string): string {
    return crypto.createHash('md5').update(str).digest('hex');
  }
}
