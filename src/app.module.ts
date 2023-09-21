import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './modules/users/infrastructure';
import { EnvConfigModule } from './shared/infrastructure/env-config';

@Module({
  imports: [EnvConfigModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
