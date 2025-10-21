import { Body, Controller, Post, Get, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { userService } from './users.service';
import { hash } from 'bcrypt';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller("users")
export class userController{
    constructor(
        private readonly userService: userService
    ) {}
    @Get()
    @UseGuards(AuthGuard)
    async getAllUsers(){
        try{

        }catch( error ){
            console.log(error)
            return error
        }
        const response = await this.userService.getAllUsers()
        console.log(response)
        return response
    }

    @Post()
    async createUser(@Body() userData: {email: string, name: string, password: string }){
        try{
            const passwordHash = await hash(userData.password, 10)
            const response = await this.userService.createUser({
                email: userData.email,
                name: userData.name,
                password: passwordHash
            })
            console.log(response)
            return response
            
        } catch(error){
            console.log(error)
            return error
        }
    }
    @Patch(":id")
    @UseGuards(AuthGuard)
    async updateUser(@Param("id") id: number, @Body() data: {email?: string, name?: string, password?: string}) {
        try {
            const response = await this.userService.updateUser(Number(id), data);
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            return { message: error };
        }
    }
    @Get(":id")
    @UseGuards(AuthGuard)
    async getByID(@Param("id") id: number){
        try{
            const user = await this.userService.getByID(Number(id))
            console.log(user)
            const {password, createdAt, updatedAt, ...userFiltered} = user
            return userFiltered

        }catch(error){
            console.error(error)
            return { message: error.message || "Erro ao buscar usuário" }
        }
    }
    @Delete(":id")
    @UseGuards(AuthGuard)
    async deleteUser(@Param("id") id: number){
        try{
            const user = await this.userService.deleteUser(Number(id))
            console.log("Removido com sucesso")
            return user
        }catch(error){
            console.error(error)
        }
    }
}