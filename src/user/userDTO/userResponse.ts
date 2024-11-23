import { IsEmail, IsNotEmpty } from "class-validator";

export class userResponse {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    age: number;
}