import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import type { INestApplication, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Prisma interferes with NestJS enableShutdownHooks.
   * Prisma listens for shutdown signals and will call `process.exit()` before
   * your application shutdown hooks fire.
   *
   * To deal with this, you would need to add a listener for Prisma beforeExit event.
   *
   * @see https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
   * @param app
   */
  static enableNestShutdownHooks(app: INestApplication) {
    // Retrieve the PrismaService instance from the NestJS app container.
    const prismaService = app.get(PrismaService);

    prismaService.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
