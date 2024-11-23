import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { userResponse } from "src/user/userDTO/userResponse";
import { loginRequest } from "../userDTO/loginRequest";


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) { }


    async login(loginRequest: loginRequest) {
        let user = await this.userService.getUserByEmail(loginRequest.email);
        if (!user) {
            throw new BadRequestException('Invalid email or password');
        }
        const isMatch = await bcrypt.compare(loginRequest.password, user.password);
        if (!isMatch) {
            throw new BadRequestException('Invalid email or password');
        }
        let payload: userResponse =
        {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            age: user.age
        };
        let accessToken = this.jwtService.sign(payload);
        let userResponse: any = { user: payload, accessToken: accessToken };
        return userResponse;
    }

    async register(registerRequest: User) {
        let user = await this.userService.getUserByEmail(registerRequest.email);
        if (user) {
            throw new BadRequestException('Email already exists');
        }
        const saltOrRounds = 10;
        const hashPassword = await bcrypt.hash(registerRequest.password, saltOrRounds);
        registerRequest.password = hashPassword;
        const registerdUser = await this.userService.createUser(registerRequest);
        let userResponse: userResponse = { email: registerdUser.email, firstName: registerdUser.firstName, lastName: registerdUser.lastName, phone: registerdUser.phone, age: registerdUser.age };
        return userResponse;
    }

}