import { IsNotEmpty, IsString } from 'class-validator';

export class loginDto {

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    password: string;
}