import { Module } from '@nestjs/common';
import { ApiController } from './controllers/api.controller';

@Module({
    imports: [],
    controllers: [ApiController],
    providers: []
})

export class AppModule {}
