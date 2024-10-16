import { IsEmail,IsNotEmpty, IsString } from 'class-validator';

export class loginDto {

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}