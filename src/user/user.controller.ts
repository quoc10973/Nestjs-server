import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { updateUserRequest } from './userDTO/userUpdateRequest';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';
import { AuthGuard } from 'src/guard/auth.guard';
import { loginRequest } from './userDTO/loginRequest';
import { AuthService } from 'src/user/authenticate/auth.service';


@Controller('user') // giống @RequestMapping trong Spring boot
@UseInterceptors(ClassSerializerInterceptor) // Serialize, giống @JsonIgnore trong Spring boot

export class UserController {
    constructor(private userService: UserService, private authenticateService: AuthService) { }

    @Get() // http://localhost:3000/user
    getUser() {
        return 'Hello from user controller';
    }

    @Post('/create') // http://localhost:3000/user/create
    async createUser(@Body(new ValidationPipe()) user: User) {
        return await this.userService.createUser(user);
    }


    //middleware -> guard -> interceptor -> response
    @Get('/getall')
    @UseGuards(AuthGuard) // 
    @UseInterceptors(new LoggingInterceptor())  // -> thực thi thao tác trước khi vào request, thực thi thao tác sau khi request xử lý xong
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

    @Post('/register')
    async register(@Body(new ValidationPipe()) registerRequest: User) {
        return await this.authenticateService.register(registerRequest);
    }

    @Post('/login')
    async login(@Body(new ValidationPipe()) loginRequest: loginRequest) {
        return await this.authenticateService.login(loginRequest);
    }

    @Post('/refresh-token')
    async refreshToken(@Body('refreshToken') refreshToken: string) {
        return await this.authenticateService.refreshToken(refreshToken);
    }
}

