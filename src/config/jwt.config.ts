import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface IJwtConfig {
  secret: string;
  expiration: string
}

export default registerAs('jwt-config', (): IJwtConfig => {
  const values: IJwtConfig = {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRATION,
  };

  const schema = Joi.object<IJwtConfig, true>({
    secret: Joi.string().required(),
    expiration: Joi.string().default('5m'),
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
