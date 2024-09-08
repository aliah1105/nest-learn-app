/* tslint:disable no-var-requires */
/* eslint @typescript-eslint/no-var-requires: "off" */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
