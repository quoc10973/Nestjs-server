import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { LoggerMiddleware } from 'src/middleware/logging.middleware';
import { AuthService } from 'src/user/authenticate/auth.service';
import { JwtModule } from '@nestjs/jwt';
require('dotenv').config();

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1d' },
  }),
  ], // import User Entity vào module de sử dụng, 
  providers: [UserService, AuthService],
  controllers: [UserController]
})
export class UserModule implements NestModule {
  // MiddlewareConsumer: là một interface của NestJS, nó cung cấp một phương thức apply() để áp dụng middleware cho một route cụ thể.
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
