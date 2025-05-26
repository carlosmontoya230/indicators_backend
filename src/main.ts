import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*"
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: false,
      forbidNonWhitelisted: false,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  app.setGlobalPrefix("api/v1");
  // Swagger config
  const configSwagger = new DocumentBuilder()
    .setTitle("API Indicators")
    .setDescription("Documentación de la API de indicadores")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup("api/v1/indicators/doc", app, document);

  const config = app.get<ConfigService>(ConfigService);
  const port = config.getOrThrow("PORT", 3000);
  await app.listen(port);

  Logger.log(`🚀 Documentación iniciado host api/v1/indicators/doc`);
  Logger.log(`🚀 Servidor iniciado en el puerto ${process.env.APP_PORT}`);
  Logger.log(
    `🚀 Conexión exitosa ${process.env.DB_DATABASE}: ${process.env.DB_TYPE}`
  );
}
bootstrap();
