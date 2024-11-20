import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { updateUserRequest } from './user.dto';


@Controller('user') // giống @RequestMapping trong Spring boot
export class UserController {
    constructor(private userService: UserService) { }

    @Get() // http://localhost:3000/user
    getUser() {
        return 'Hello from user controller';
    }

    @Post('/create') // http://localhost:3000/user/create
    async createUser(@Body(new ValidationPipe()) user: User) {
        return await this.userService.createUser(user);
    }

    @Get('/getall')
    async getAllUser() {
        return await this.userService.getAllUser();
    }

    @Get('/getbyid')
    async getUserById(@Query('id') id: string) {
        if (!id) {
            throw new BadRequestException('User ID is required');
        }
        return await this.userService.getUserById(id);
    }

    @Get('/getbyemail')
    async getUserByEmail(@Query('email') email: string) {
        if (!email) {
            throw new BadRequestException('Email is required');
        }
        return await this.userService.getUserByEmail(email);
    }

    @Put('/update') //http://localhost:8080/user/update?id=XXX
    async updateById(@Query('id') id: string, @Body(new ValidationPipe()) requestBody: updateUserRequest) {
        if (!id) {
            throw new BadRequestException('User ID is required');
        }

        return await this.userService.updateById(id, requestBody);
    }

    @Put('/:id') //http://localhost:8080/user/XXX
    async updateById2(@Param('id') id: string, @Body(new ValidationPipe()) requestBody: updateUserRequest) {
        return await this.userService.updateById(id, requestBody);
    }

    @Delete('/:id') //http://localhost:8080/user/XXX
    async deleteUserById(@Param('id') id: string) {
        return await this.userService.deleteById(id);
    }
}
