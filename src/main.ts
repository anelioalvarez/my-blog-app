import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './exception-filters/prisma-client-exception.filter';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup Global Pipes and Interceptors
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Setup Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('My Blog App :D')
    .setDescription('The My Blog App API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Setup Global Filters
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // Setup App Port
  const configService = app.get(ConfigService);
  const appConfig = configService.get<IAppConfig>('app-config');

  await app.listen(appConfig.port);
}
bootstrap();
