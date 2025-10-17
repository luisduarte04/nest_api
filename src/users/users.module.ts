import { Module } from '@nestjs/common';
import { userController } from './users.controller';
import { userService } from './users.service';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [userController],
    providers: [userService],
})
export class UsersModule {}
