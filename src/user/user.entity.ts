import { IsEmail, IsOptional, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    @Column()
    @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
    password: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    @IsOptional()
    age: number;
}