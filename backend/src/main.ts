import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from './app.module';

config(); // ENV keys (like the database key)

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3001);
}

bootstrap();