import { DataSource } from 'typeorm';
import { MovieWatched } from '../entity/MovieWatched.entity';

export const MovieWatchedProviders = [
  {
    provide: 'MOVIE_WATCHED_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(MovieWatched),
    inject: ['DATA_SOURCE'],
  },
];