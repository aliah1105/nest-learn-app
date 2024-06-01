/* tslint:disable no-var-requires */
/* eslint @typescript-eslint/no-var-requires: "off" */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['khfgdfhgdhfgod4d6fg54d6fgd5fhg6df4hf46fd54h6df54hs'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
