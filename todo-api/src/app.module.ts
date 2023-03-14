import { Module } from '@nestjs/common';

import { TypeOrmGlobalModule } from './typeorm-global';
import { AppController } from './app.controller';
import { UserModule } from './user';
import { AppService } from './app.service';

@Module({
  imports: [UserModule, TypeOrmGlobalModule.registerGlobalEntities()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
