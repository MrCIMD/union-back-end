import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('Gob App')
    .setDescription('Backend for Union')
    .setVersion('1.0')
    .addTag('Endpoints')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(AppModule.PORT);

  console.log(`[ Menu It Docs ] host run in ${AppModule.HTTP}://${AppModule.HOST}:${AppModule.PORT}/docs`)
  console.log(`[ Menu It ] host run in ${AppModule.HTTP}://${AppModule.HOST}:${AppModule.PORT}/api/`)
}
bootstrap();
