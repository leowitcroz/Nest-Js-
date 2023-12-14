import { IsEmail, IsString, MinLength, isString } from "class-validator";

export class AuthForgetDto{

    @IsEmail()
    email: string;
}