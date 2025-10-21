import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import  bcrypt  from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {}
    async login(data: Prisma.UserCreateInput){
        const user = await this.prisma.user.findUnique({
            where: {
                email: data.email
            }
        })
        if (!user) {
            throw new UnauthorizedException("User or password is invalid");
        }
        const passwordValid = await bcrypt.compare(data.password, user.password)
        if(!passwordValid){
            throw new UnauthorizedException("User or password is invalid")
        }
        const payload = { sub: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
