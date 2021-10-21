import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function startApp() {
  const PORT = process.env.PORT || 3000
  const app = await NestFactory.create(AppModule) // connect modules here


  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
}

startApp()