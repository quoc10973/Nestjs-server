import { BadRequestException, Injectable, Req, Request } from "@nestjs/common";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { userResponse } from "src/user/userDTO/userResponse";
import { loginRequest } from "../userDTO/loginRequest";
import { In, Repository, Timestamp } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
require('dotenv').config();


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
        const isMatch = await bcryptjs.compare(loginRequest.password, user.password);
        if (!isMatch) {
            throw new BadRequestException('Invalid email or password');
        }
        let userResponse: userResponse = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            phone: user.phone,
            age: user.age
        };
        const accessToken: string = await this.generateToken(user);
        const refreshToken: string = await this.generateRefreshToken(user);
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
        const hashPassword = await bcryptjs.hash(registerRequest.password, saltOrRounds);
        registerRequest.password = hashPassword;
        const registerdUser = await this.userService.createUser(registerRequest);
        return registerdUser;
    }

    async generateToken(user: User) {
        let payload: any =
        {
            userId: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userRole: user.role
        };
        return this.jwtService.sign(payload);
    }

    generateRefreshToken(user: any): string {
        return this.jwtService.sign({ id: user.id, email: user.email }, {
            secret: process.env.REFRESH_TOKEN_SECRET,
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
        });
    }

    async refreshToken(refreshToken: string) {
        let user = await this.userRepository.findOne({ where: { refreshToken: refreshToken } });
        if (!user) {
            throw new BadRequestException('Invalid refresh token');
        }
        if (user.expireIn < new Date()) {
            throw new BadRequestException('Refresh token expired');
        }
        const accessToken: string = await this.generateToken(user);
        const newRefreshToken: string = await this.generateRefreshToken(user);
        user.refreshToken = newRefreshToken;
        const expireIn = new Date();
        expireIn.setDate(expireIn.getDate() + 7);
        user.expireIn = expireIn;
        await this.userRepository.save(user);
        const response: any = { accessToken: accessToken, refreshToken: newRefreshToken };
        return response;

    }

}