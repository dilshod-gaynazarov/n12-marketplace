import { IsNotEmpty, IsString } from "class-validator";

export class AdminSigninDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}