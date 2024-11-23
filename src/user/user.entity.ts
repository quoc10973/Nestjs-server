import { Exclude } from "class-transformer";
import { IsEmail, IsOptional, IsPhoneNumber, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
enum ROLE {
    ADMIN = 'ADMIN',
    MOD = 'MOD',
    USER = 'USER'
}

@Entity()
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: 'enum', enum: ROLE, default: ROLE.USER })
    @Exclude()
    role: ROLE;

    @Column()
    @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
    password: string;

    @Column({ nullable: true })
    @IsOptional()
    age: number

    @Column()
    @IsPhoneNumber('VN')
    phone: string;


}