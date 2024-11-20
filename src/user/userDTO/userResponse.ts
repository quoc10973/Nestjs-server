import { IsEmail, IsNotEmpty } from "class-validator";

export class updateUserRequest {
    id: string;
    email: string;
    name: string;
    age: number;
}