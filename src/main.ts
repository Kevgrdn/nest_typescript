import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth.guard';

/** Start app */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    disableErrorMessages: true
  }))
  
  app.set("trust proxy", 1)

  await app.listen(3000);
}
bootstrap();
