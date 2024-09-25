import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function startApp() {
  const PORT = Number(process.env.PORT);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api');
  await app.listen(PORT, () => console.log('Server running on port', PORT));
}
startApp();
