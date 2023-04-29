import { typedConfigFactory } from '@lib/typed-config';
import { z } from 'zod';

/**
 * The zod validation schema for the app config.
 */
const appConfigSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'staging', 'production'])
    .default('development'),
  HOSTNAME: z.string().default('0.0.0.0'),
  PORT: z.coerce.number().default(3000),
});

export const {
  TypedConfigModule: AppConfigModule,
  TypedConfigService: AppConfigService,
} = typedConfigFactory(appConfigSchema);
