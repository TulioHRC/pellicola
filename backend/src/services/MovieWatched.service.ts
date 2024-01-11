import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MovieWatchedEntity } from '../entity/MovieWatched.entity';

@Injectable()
export class MovieWatchedService {
  constructor(
    @Inject('MOVIE_WATCHED_REPOSITORY')
    private movieRepository: Repository<MovieWatchedEntity>,
  ) {}

  async findAll(): Promise<MovieWatchedEntity[]> {
    return this.movieRepository.find();
  }

  async create(movieWatchedData: Partial<MovieWatchedEntity>): Promise<MovieWatchedEntity> {
    const newMovieWatched = this.movieRepository.create(movieWatchedData);
    return await this.movieRepository.save(newMovieWatched);
  }

  async delete(movieID: number): Promise<MovieWatchedEntity> {
    const movieWatchedToDelete = await this.movieRepository.findOne({
      where: {
        id: movieID
      }
    })
    await this.movieRepository.remove(movieWatchedToDelete);
    return movieWatchedToDelete;
  }
}