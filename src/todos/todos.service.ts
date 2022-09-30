import { Injectable } from '@nestjs/common';
import { CreateTodoListDto } from './dto/create-todolist.dto';
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

  create(createTodListDto: CreateTodoListDto): Promise<TodoList> {
    return this.todolistRepository.save(this.todolistRepository.create(createTodListDto));
  }

  findAll():Promise<TodoList[]> {
    return this.todolistRepository.find({relations: {todos: true}});
  }

  findOne(id: number) {
    return this.todolistRepository.findOne({
      where: {id}, 
      relations: {todos: true}});
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
