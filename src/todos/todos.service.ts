import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import {InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Todo, TodoList } from './entities';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoList)
    private todolistRepository: Repository<TodoList>,
    
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>
  )
  {}

  create(createTodoDto: CreateTodoDto) {
    return 'This action adds a new todo';
  }

  findAll():Promise<TodoList[]> {
    return this.todolistRepository.find({relations: {todos: true}});
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
