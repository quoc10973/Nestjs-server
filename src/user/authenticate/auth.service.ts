import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { userResponse } from "src/user/userDTO/userResponse";
import { loginRequest } from "../userDTO/loginRequest";
import { In, Repository, Timestamp } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
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
        let userResponse: userResponse = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            age: user.age
        };
        const accessToken: string = await this.generateToken(user);
        const refreshToken: string = await this.generateToken(user);
        user.refreshToken = refreshToken;
        const expireIn = new Date();
        expireIn.setDate(expireIn.getDate() + 7);
        user.expireIn = expireIn;
        await this.userRepository.save(user);
        const response: any = { user: userResponse, accessToken: accessToken, refreshToken: refreshToken };
        return response;

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

    async generateToken(user: User) {
        let payload: any =
        {
            userId: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        };
        return this.jwtService.sign(payload);
    }



}