import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AnswersService {
  constructor(
    private readonly prisma: PrismaService
  ) {}
  create(createAnswerDto: CreateAnswerDto, userId: number, questionId: number) {
    return this.prisma.answers.create({
      data: {...createAnswerDto, userId, questionId}
    })
  }

  findAll() {
    return this.prisma.answers.findMany()
  }

  async findOne(id: number) {
    return this.prisma.answers.findFirst({
      where: { id }
    })
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    const answer = await this.prisma.answers.findUnique({
      where: { id }
    })
    if (!answer) {
      throw new NotFoundException(`Id não encontrado`);
    }
    
    return this.prisma.answers.update({
      where: { id },
      data: { ...updateAnswerDto }
    });
  }

  async remove(id: number) {
    const answer = await this.prisma.answers.findUnique({
      where: {id}
    })
    if(!answer){
      throw new ConflictException("Answer inválido.")
    }
    return this.prisma.answers.delete({
      where: {id: answer.id}
    })
  }
}
