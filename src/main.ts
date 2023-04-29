import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import { AppConfigService } from './app-config.module';
import { AppModule } from './app.module';

const main = async () => {
  const fastifyAdapter = new FastifyAdapter();

  const app = await NestFactory.create(AppModule, fastifyAdapter);

  app.useGlobalPipes(new ValidationPipe());

  const appConfigService = app.get(AppConfigService);

  const hostname = appConfigService.get('HOSTNAME');
  const port = appConfigService.get('PORT');

  await app.listen(port, hostname);

  Logger.log(`Server running on http://${hostname}:${port}`, 'Main');
};

void main();
