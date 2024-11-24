import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class userResponse {
    @Expose()
    id: string;

    @Expose()
    email: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    phone: string;

    @Expose()
    age: number;
}