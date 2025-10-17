import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';



@Injectable()
export class userService{
  constructor(
    private readonly prisma: PrismaService
  ) {}
  async getAllUsers(){
    return await this.prisma.user.findMany()
  }
  async createUser(data: {email: string, name: string, password: string}){
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: data.email
      }
    }) 
    if(userExists){
      console.error("Usuário já tem cadastro")
    }
    return await this.prisma.user.create({data})
  }
  async updateUser(id: number, data: {email?: string; name?: string; password?: string }){
    const numericId = id;
    const user = await this.prisma.user.findUnique({
      where: {
        id: numericId
      }
    })
    if(!user){
      console.log("User não encontrado")
    }
    const response = await this.prisma.user.update({
      where: {id},
      data
    })
    return response
  }
  
}