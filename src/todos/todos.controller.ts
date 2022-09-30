import { Controller, Get, Post, Body, Patch, Param, Delete,
UnauthorizedException,
BadRequestException, 
BadGatewayException,
ParseIntPipe,
HttpStatus} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoListDto } from './dto/create-todolist.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import {EventEmitter2} from '@nestjs/event-emitter'
import { TodoList } from './entities';
import { OnEvent } from '@nestjs/event-emitter/dist/decorators';
import { SkipThrottle } from '@nestjs/throttler';
import { Throttle } from '@nestjs/throttler/dist/throttler.decorator';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private eventEmitter: EventEmitter2
    ) {}

  @Throttle(5, 60)
  @Post()
  async create(@Body() createTodoDto: CreateTodoListDto): Promise<TodoList> {
    const todolist = this.todosService.create(createTodoDto);
    this.eventEmitter.emit("todos.created", todolist)

    return todolist
  }

  @Get("/test")
  getTest(){
    throw new BadGatewayException();
    
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  @SkipThrottle()
  findOne(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }

  @OnEvent("todos.created")
  listenTodosCreated(todolist: TodoList){
    console.log(`New todolist created ${todolist.id}`);
  }
}
