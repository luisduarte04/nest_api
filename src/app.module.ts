import { Module } from '@nestjs/common';
import { userController } from './users/users.controller';
import { userService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';

@Module({
  imports: [UsersModule, AuthModule, DatabaseModule, QuestionsModule, AnswersModule],
  controllers: [userController],
  providers: [userService],
})
export class AppModule {}
