import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from './app.module';
import * as cors from 'cors'

config(); // ENV keys (like the database key)

const PORT = process.env.PORT || 3001 

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cors(corsOptions));
    await app.listen(PORT);
    console.log(`Listening on ${PORT}`)
}

bootstrap();