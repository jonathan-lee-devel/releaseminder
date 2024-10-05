import {Logger, ValidationPipe, VersioningType} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import helmet from 'helmet';

import {ApiModule} from './api.module';
import {MainConfig} from './config/main.config';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(ApiModule, {logger, rawBody: true});
  const mainConfig = app.get<MainConfig>(MainConfig);

  app.enableCors({
    origin: mainConfig.frontEndUrl.split(','),
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  app.use(helmet());

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });
  if (mainConfig.nodeEnv === 'development') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('ReleaseMinder')
      .setDescription('ReleaseMinder API')
      .setVersion('0.0.1')
      .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, swaggerDocument, {
      customCssUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
      ],
    });
  }

  app.useGlobalPipes(
    new ValidationPipe({transform: true, validateCustomDecorators: true}),
  );

  logger.log(`Running in NODE_ENV: ${mainConfig.nodeEnv}`);

  logger.log(`Listening on port: ${mainConfig.port}`);
  await app.listen(mainConfig.port);
}
bootstrap().catch((error) => console.error(error));
