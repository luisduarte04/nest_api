import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class userService{
  constructor(
    private readonly prisma: PrismaService
  ) {}
  async getAllUsers(){
    return await this.prisma.user.findMany()
  }
  async createUser(data: { email: string; name: string; password: string }) {
    const userExists = await this.prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (userExists) {
        throw new ConflictException('Usuário já está cadastrado.');
    }

    return await this.prisma.user.create({ data });
}
  async updateUser(id: number, data: {email?: string, name?: string, password?: string}){
  const user = await this.prisma.user.findUnique({
    where: {
      id
    }
  });
  if (!user) {
    return await new NotFoundException('User não existe');
  }
  const response = await this.prisma.user.update({
    where: { id },
    data
  });
  return response
  }
  async getByID(id){
    const user = await this.prisma.user.findUnique({
      where: {
        id: Number(id)
      }
    })
    if (!user) {
      throw new Error("User not found");
    }
    return user
  }
  async deleteUser(id: number){
    return this.prisma.user.delete({
      where: {id}
    })
  }
}