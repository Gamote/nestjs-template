import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

import type { PrismaModuleOptions } from './interfaces';
import type { DynamicModule } from '@nestjs/common';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {
  static forRoot(options: PrismaModuleOptions = {}): DynamicModule {
    return {
      global: options.isGlobal,
      module: PrismaModule,
    };
  }
}
