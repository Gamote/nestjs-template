import { Global, Injectable, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import type { z } from 'zod';

/**
 * A typed verson of {@link ConfigService} that can be used across the app,
 * so we don't have to define the generic types every time.
 */
@Injectable()
class TypedConfigService<SchemaType> {
  constructor(public readonly configService: ConfigService<SchemaType, true>) {}

  /**
   * Wrap the {@link ConfigService.get} method so the consumer
   * doesn't have to provide the generic types.
   */
  get<PropertyPath extends keyof SchemaType>(
    propertyPath: PropertyPath,
  ): SchemaType[PropertyPath] {
    return this.configService.get(
      propertyPath as keyof SchemaType extends never
        ? string
        : keyof SchemaType,
    );
  }
}

/**
 * This is the factory method that creates the {@link TypedConfigModule} and
 * {@link TypedConfigService} for the app. Using this method we make sure that
 * the {@link TypedConfigService} is properly typed and can be used across the app.
 */
export const typedConfigFactory = <
  SchemaType extends z.ZodType<Record<string | number | symbol, unknown>>,
>(
  schema: SchemaType,
) => {
  @Global()
  @Module({
    imports: [
      ConfigModule.forRoot({
        validate: (options) => schema.parse(options),
      }),
    ],
    providers: [TypedConfigService],
    exports: [TypedConfigService],
  })
  class TypedConfigModule {}

  return {
    TypedConfigModule,
    TypedConfigService: TypedConfigService<z.infer<SchemaType>>,
  };
};
