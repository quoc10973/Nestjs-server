import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestConnectionService } from './config/testConnection';
import { ConfigModule, ConfigService } from '@nestjs/config';
require('dotenv').config();


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('PORT'),
        username: configService.get('DB_USER '),
        password: configService.get('DB_PASS '),
        database: configService.get('DB_NAME'),
        entities: [],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    UserModule],
  controllers: [AppController],
  providers: [AppService, TestConnectionService],
})
export class AppModule { }
