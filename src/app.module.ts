import { Module } from '@nestjs/common';
import { userController } from './users/users.controller';
import { userService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [UsersModule],
  controllers: [userController],
  providers: [userService, PrismaService],
})
export class AppModule {}
