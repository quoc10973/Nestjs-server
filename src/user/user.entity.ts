import { IsEmail, IsOptional, Length } from "class-validator";
import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Index("email", ["email"], { unique: true })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @IsEmail({}, { message: 'Email is not valid' })
    email: string;

    @Column()
    @Length(6, 20)
    password: string;

    @Column()
    name: string;

    @Column({ nullable: true }) // Đảm bảo trường age có thể để trống
    @IsOptional()
    age: number;
}

