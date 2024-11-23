import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class loginRequest {

    email: string;
    password: string;
}