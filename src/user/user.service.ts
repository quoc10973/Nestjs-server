import { BadRequestException, Body, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { updateUserRequest } from './userDTO/userUpdateRequest';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { } //tương tự repo extends JpaRepository trong Spring boot, tiem con
    //CRUD

    //việc sử dụng trycath trong các hàm find findOne ... là kh hiệu quả vì kh trả ra exception mà trả ra undefined.

    async createUser(user: User) {
        try {
            const newUser = await this.userRepository.save(user);
            return newUser;
        } catch (err) {
            throw new Error("Failed to create user: " + err.message);
        }
    }

    async getAllUser() {
        try {
            console.log("second");
            const users = await this.userRepository.find();
            return users;
        } catch (err) {
            throw new Error("Failed to get users: " + err.message);
        }
    }

    async getUserById(id: string) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new BadRequestException('User not found');
        }
        return user;

    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new BadRequestException('User not found');
        }
        return user;

    }

    async updateById(id: string, requestBody: updateUserRequest) {
        let user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const updatedUser = plainToInstance(User, { ...user, ...requestBody });
        try {
            await this.userRepository.save(updatedUser);
            return updatedUser;
        } catch (err) {
            throw new InternalServerErrorException(`Failed to update user: ${err.message}`);
        }
    }

    async deleteById(id: string) {
        let user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        try {
            await this.userRepository.delete({ id });
            const reponse = {
                message: 'Delete success',
                user
            }
            return reponse;
        } catch (err) {
            throw new InternalServerErrorException(`Failed to delete user: ${err.message}`);
        }
    }

}
