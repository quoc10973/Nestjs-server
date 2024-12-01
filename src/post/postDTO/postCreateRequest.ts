import { Expose } from "class-transformer";

export class postCreateRequest {

    @Expose()
    title: string;
    @Expose()
    content: string;
}