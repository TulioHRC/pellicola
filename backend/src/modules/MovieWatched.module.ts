import { Module } from '@nestjs/common';
import { DatabaseModule } from '../modules/database.module';
import { MovieWatchedProviders } from '../providers/MovieWatched.providers';
import { MovieWatchedService } from '../services/MovieWatched.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...MovieWatchedProviders,
    MovieWatchedService,
  ],
  exports: [MovieWatchedService]
})
export class MovieWatchedModule {}