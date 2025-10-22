import { IsNotEmpty, MinLength, MaxLength, IsString, IsEmail, IsStrongPassword, Length } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    email: string;

    @IsNotEmpty()
    @Length(5, 50)
    @IsStrongPassword({
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    password: string;
}