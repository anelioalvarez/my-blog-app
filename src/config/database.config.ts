import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface IDatabaseConfig {
  user: string;
  password: string;
  db: string;
  url: string;
}

export default registerAs('database-config', (): IDatabaseConfig => {
  const values: IDatabaseConfig = {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    db: process.env.POSTGRES_DB,
    url: process.env.DATABASE_URL,
  };

  const schema = Joi.object<IDatabaseConfig, true>({
    user: Joi.string().required(),
    password: Joi.string().required(),
    db: Joi.string().required(),
    url: Joi.string().required(),
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
