import { Body, Controller, Post, Get, Patch, Param, Delete, UseGuards, ParseIntPipe} from '@nestjs/common';
import { userService } from './users.service';
import { hash } from 'bcrypt';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';


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
    async createUser(@Body() createUserDto: CreateUserDto){
        try{
            const passwordHash = await hash(createUserDto.password, 10)
            const response = await this.userService.createUser({
                email: createUserDto.email,
                name: createUserDto.name,
                password: passwordHash
            })
            const {password, ...responseUser} = response
            console.log(responseUser)
            return responseUser
            
        } catch(error){
            console.log(error)
            return error
        }
    }
    @Patch(":id")
    @UseGuards(AuthGuard)
    async updateUser(@Param("id", ParseIntPipe) id: number, @Body() data: {email?: string, name?: string, password?: string}) {
        try {
            const response = await this.userService.updateUser(id, data);
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            return { message: error };
        }
    }
    @Get(":id")
    @UseGuards(AuthGuard)
    async getByID(@Param("id", ParseIntPipe) id: number){
        try{
            const user = await this.userService.getByID(id)
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
    async deleteUser(@Param("id", ParseIntPipe) id: number){
        try{
            const user = await this.userService.deleteUser(id)
            console.log("Removido com sucesso")
            return user
        }catch(error){
            console.error(error)
        }
    }
}