import { ConflictException, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/database/prisma.service';
@Injectable()
export class QuestionsService {
  constructor(
    private readonly prisma: PrismaService
  ) {}
  async create(createQuestionDto: CreateQuestionDto, userId: number) {
    return await this.prisma.questions.create({
      data: {...createQuestionDto, userId: userId}
    })
  }
  async findAll() {
    return await this.prisma.questions.findMany()
  }

  async findOne(id: number) {
    return await this.prisma.questions.findFirst({
      where: {
        id
      }
    })
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const user = await this.prisma.questions.findFirst({
      where: {
        id
      }
    })
    if(!user){
      throw new ConflictException("Usuário já está cadastrado.")
    }
    return this.prisma.questions.update({
      where: { id: user.id },
      data: updateQuestionDto
    })
  }

  async remove(id: number) {
    const question = await this.prisma.questions.findUnique({
      where: { id}
    })
    
    if (!question) {
      throw new ConflictException("Questão não encontrada.");
    }
    return await this.prisma.questions.delete({
      where: { id }
    })
  }
}
