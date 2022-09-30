import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    TodosModule,
    TypeOrmModule.forRoot({
      type:"sqlite",
      database: "db.sqlite",
      synchronize: true,
      entities:[]
    }),
    TodosModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports:[TypeOrmModule]
})
export class AppModule {}
