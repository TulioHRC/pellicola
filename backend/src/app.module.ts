import { Module } from '@nestjs/common';
import { ApiController } from './controllers/api.controller';
import { MovieWatchedModule } from './modules/MovieWatched.module';


@Module({
    imports: [MovieWatchedModule],
    controllers: [ApiController],
    providers: []
})

export class AppModule {}
