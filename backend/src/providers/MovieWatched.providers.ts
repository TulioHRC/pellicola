import { DataSource } from 'typeorm';
import { MovieWatchedEntity } from '../entity/MovieWatched.entity';

export const MovieWatchedProviders = [
  {
    provide: 'MOVIE_WATCHED_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(MovieWatchedEntity),
    inject: ['DATA_SOURCE'],
  },
];