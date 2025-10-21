import { Module } from '@nestjs/common';
import { userController } from './users/users.controller';
import { userService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UsersModule, AuthModule, DatabaseModule],
  controllers: [userController],
  providers: [userService],
})
export class AppModule {}
