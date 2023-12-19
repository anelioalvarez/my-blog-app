import { ConfigModuleOptions } from '@nestjs/config';
import appConfig from './app.config';
import databaseConfig from './database.config';
import jwtConfig from './jwt.config';

const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  load: [appConfig, databaseConfig, jwtConfig],
};

export default configOptions;
