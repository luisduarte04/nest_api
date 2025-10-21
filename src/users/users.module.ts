import { forwardRef, Module } from '@nestjs/common';
import { userController } from './users.controller';
import { userService } from './users.service';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [DatabaseModule, forwardRef(() => AuthModule)],
    controllers: [userController],
    providers: [userService],
    exports: [UsersModule]
})
export class UsersModule {}
