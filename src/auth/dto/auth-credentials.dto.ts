import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AuthCredentialsDto {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message: "Password too weak. At least 8 characters, one uppercase letter, one normal letter, one number and a special character."}
        ) // Custom message if password doesn't match regex
    password: string;
}