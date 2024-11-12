import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestConnectionService } from './config/testConnection';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'NestjsDemo',
      entities: [],
      synchronize: true,
    }),
    UserModule],
  controllers: [AppController],
  providers: [AppService, TestConnectionService],
})
export class AppModule { }
