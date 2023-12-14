import { IsEmail, IsString, MinLength, isString } from "class-validator";

export class AuthLoginDto{

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password:string;
}