import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestConnectionService } from './config/testConnection';
import { User } from './user/user.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'NestjsDemo',
      entities: [User],
      synchronize: true,
    }),
    UserModule],
  controllers: [AppController],
  providers: [AppService, TestConnectionService],
})
export class AppModule { }
