// import { JwtAuthGuard } from '@account/guards/jwt-auth.guard';
import { HttpExceptionFilter } from '@infrastructure/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'body-parser';
import { text } from 'express';
import { JwtAuthGuard } from '@user/guards/jwt-auth.guard';
// import { json, urlencoded } from 'body-parser';
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(text());
  process.env.TZ = 'Africa/Addis_Ababa'; // UTC +03:00
  app.setGlobalPrefix('api');
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: false,
      docExpansion: 'none',
    },
    customSiteTitle: 'Kachamale Software Solution API Documentation',
  };
  const config = new DocumentBuilder()
    .setTitle('Kachamale Software Solution ')
    .setDescription('Task Management API Documentation')
    .setVersion('1.0')
    .setContact(
      'Kachamale Software Solution',
      'https://kachamale.com',
      'kachamale@info.com',
    )
    .addBearerAuth(
      {
        type: 'http',
        schema: 'Bearer',
        bearerFormat: 'Token',
      } as SecuritySchemeObject,
      'Bearer',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  // pipes
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  SwaggerModule.setup('/', app, document, customOptions);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  const PORT = process.env.PORT || 3000;
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  await app.listen(PORT);
  const date = new Date();
  console.log(`Current Date=> ${date} ${process.env.NODE_ENV}`);
  console.log(`🚀 bus ticketing is running on:  ${await app.getUrl()}`);
}
bootstrap();
