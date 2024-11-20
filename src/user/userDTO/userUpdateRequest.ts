import { IsEmail, IsNotEmpty } from "class-validator";

export class updateUserRequest {
    @IsNotEmpty()
    name: string;

    age: number;
}