import { IsNotEmpty, MinLength, MaxLength, IsString, IsInt} from 'class-validator';
export class CreateAnswerDto {
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    @IsString()
    body: string

    @IsNotEmpty({ message: 'O ID da pergunta é obrigatório' })
    @IsInt({ message: 'O ID da pergunta deve ser um número inteiro' })
    questionId: number;
}
