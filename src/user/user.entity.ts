import { Exclude } from "class-transformer";
import { IsEmail, IsOptional, IsPhoneNumber, Length } from "class-validator";
import { Post, } from "src/post/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, Unique } from "typeorm";
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

    @Column({ type: 'text' })
    refreshToken: string;

    @Column({ type: 'timestamp', nullable: true })
    expireIn: Date;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];
}