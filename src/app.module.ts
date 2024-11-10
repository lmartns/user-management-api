import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/user.module';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
