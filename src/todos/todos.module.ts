import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo, TodoList } from './entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([TodoList, Todo])
  ],
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule {}
