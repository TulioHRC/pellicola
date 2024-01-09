import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from './app.module';

config(); // ENV keys (like the database key)

const PORT = process.env.PORT || 3001 

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(PORT);
    console.log(`Listening on ${PORT}`)
}

bootstrap();