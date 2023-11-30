import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { SeederService } from './modules/seeder/services/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  if (process.env.NODE_ENV !== 'production') {
    console.log('Seeding data...');
    const seeder = app.get(SeederService);
    await seeder.seed();
    console.log('Data seeded!');
  }
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
