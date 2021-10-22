import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function startApp() {
  const PORT = process.env.PORT || 3000
  const app = await NestFactory.create(AppModule) // connect modules here

  const config = new DocumentBuilder()
    .setTitle('MCredit')
    .setDescription('Documentation')
    .setVersion('1.0.0')
    .addTag('MCredit')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/documentation', app, document)

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
}

startApp()