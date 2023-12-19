import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface IAppConfig {
  port: number;
  environment: string;
}

export default registerAs('app-config', (): IAppConfig => {
  const values: IAppConfig = {
    port: parseInt(process.env.PORT),
    environment: process.env.NODE_ENV,
  };

  const schema = Joi.object<IAppConfig, true>({
    port: Joi.number().default(3000),
    environment: Joi.string()
      .valid('development', 'production', 'test')
      .default('development'),
  });

  const { error } = schema.validate(values, { abortEarly: false });

  if (error) {
    throw new Error(
      `Validation failed - Is there an environment variable missing?
      ${error.message}`,
    );
  }

  return values;
});
