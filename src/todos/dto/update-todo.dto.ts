import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoListDto } from './create-todolist.dto';

export class UpdateTodoDto extends PartialType(CreateTodoListDto) {}
