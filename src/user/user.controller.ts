import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user') // giống @RequestMapping trong Spring boot
export class UserController {
    constructor(private userService: UserService) { }

    @Get() // http://localhost:3000/user
    getUser() {
        return 'Hello from user controller';
    }

    @Post('/create') // http://localhost:3000/user/create
    createUser(@Body(new ValidationPipe()) user: User) {
        return this.userService.createUser(user);
    }
}
