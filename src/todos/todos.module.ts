import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo, TodoList } from './entities';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([TodoList, Todo])
  ],
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule {}
