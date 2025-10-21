import { Get, Body, Controller, HttpCode, Request, HttpStatus, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}
    @Post("login")
    @HttpCode(HttpStatus.OK)
    async authController(@Body() data: {email: string, password: string}){
        try{
            const user = await this.authService.login(data)
            console.log(user)
            return user

        }catch(error){
            console.log(error)
            return error
        }
    }
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
  }
}
