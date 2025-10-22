import { IsNotEmpty, MinLength, MaxLength, IsString } from 'class-validator';

export class CreateQuestionDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(100)
    title: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @MaxLength(1000)
    body: string;
}
