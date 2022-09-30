import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Todo, TodoList } from './todos/entities';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule } from '@nestjs/throttler'
import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';


@Module({
  imports: [
    TodosModule,
    TypeOrmModule.forRoot({
      type:"sqlite",
      database: "db.sqlite",
      synchronize: true,
      entities:[TodoList, Todo]
    }),
    TodosModule,
    AuthModule,
    EventEmitterModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 120,
      limit: 20,
      ignoreUserAgents: [/customagent/]
    })
  ],
  controllers: [AppController],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard
  },
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  },
  
  AppService,
  AuthService
],
  exports:[TypeOrmModule]
})
export class AppModule {}
