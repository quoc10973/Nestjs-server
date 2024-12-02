import { Expose } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";

export class postUpdateRequest {
    @Expose()
    @IsNotEmpty()
    @Length(1, 40, { message: 'Title must be between 1 and 40 characters' })
    title: string;
    content: string;
}