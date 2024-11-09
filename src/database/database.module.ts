import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'database-users',
      autoLoadEntities: true,
      entities: [User],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
