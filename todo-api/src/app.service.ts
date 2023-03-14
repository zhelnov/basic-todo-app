import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto';
import { ItemEntity } from './entities/item.entity';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemRepo: Repository<ItemEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async find(userId: string, filter?: string) {
    const user = await this.getUser(userId, filter);
    return user.items;
  }

  async create(userId: string, dto: CreateTodoDto) {
    return this.itemRepo.save({
      ...dto,
      user: await this.getUser(userId),
    });
  }

  async checkmark(userId: string, id: string, completed: boolean) {
    const item = await this.itemRepo.findOne({
      where: { id, user: { id: userId } },
    });
    if (item.completed !== completed) {
      return this.itemRepo.save({ ...item, completed });
    }
    return item;
  }

  async delete(userId: string, id: string) {
    const result = await this.itemRepo.delete({
      id,
      user: { id: userId },
    });
    return result.affected > 0;
  }

  protected async getUser(id: string) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['items'],
      order: {
        items: {
          createdAt: 'ASC',
        },
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
