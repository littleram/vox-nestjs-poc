import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Agora API')
    .setDescription(
      `This API is the source of truth for e-comm data at NYM/Vox.This API is currently used for internal tooling and data flows, and is not accessible outside VPN network. The version noted here reflects the [Agora release version](https://github.com/nymag/agora/releases), and does not reflect strict API versioning`,
    )
    .setVersion('v0.2.22')
    .addTag('default')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
