import { Body, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    //CRUD

    async createUser(user: User) {
        try {
            const newUser = await this.userRepository.save(user);
            return newUser;
        } catch (err) {
            throw new Error("Failed to create user: " + err.message);
        }
    }
}
