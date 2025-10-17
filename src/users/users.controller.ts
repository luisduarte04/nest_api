import { Body, Controller, Post, Get, Patch, Param } from '@nestjs/common';
import { userService } from './users.service';

@Controller("users")
export class userController{
    constructor(
        private readonly userService: userService
    ) {}
    @Get()
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
            const response = await this.userService.createUser(userData)
            console.log(response)
            return response
            
        } catch(error){
            console.log(error)
            return error
        }

    }
    @Patch(":id")
    async updateUser(@Param('id') id: string, @Body() userData: { email?: string; name?: string; password?: string }) {
        try {
            const numericId = parseInt(id, 10); 
            const response = await this.userService.updateUser(numericId, userData);
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            return { message: error };
        }
    }
}