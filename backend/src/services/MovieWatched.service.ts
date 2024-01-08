import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MovieWatched } from '../entity/MovieWatched.entity';

@Injectable()
export class MovieWatchedService {
  constructor(
    @Inject('MOVIE_WATCHED_REPOSITORY')
    private movieRepository: Repository<MovieWatched>,
  ) {}

  async findAll(): Promise<MovieWatched[]> {
    return this.movieRepository.find();
  }

  async create(movieWatchedData: Partial<MovieWatched>): Promise<MovieWatched> {
    const newMovieWatched = this.movieRepository.create(movieWatchedData);
    return this.movieRepository.save(newMovieWatched);
  }
}