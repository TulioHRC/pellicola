import { Controller, Get, Post, Delete, Body } from '@nestjs/common'
import { MovieWatchedService } from 'src/services/MovieWatched.service'
import { MovieWatchedEntity } from 'src/entity/MovieWatched.entity'


@Controller('api')
export class ApiController {
    constructor(private readonly movieService: MovieWatchedService) {}

    @Get()
    findAll(): Promise<MovieWatchedEntity[]> {
        return this.movieService.findAll();
    }

    @Post()
    create(@Body() movieWatchedData: Partial<MovieWatchedEntity>): Promise<MovieWatchedEntity> {
        return this.movieService.create(movieWatchedData);
    }

    @Delete()
    delete(@Body() movieWatchedData: Partial<MovieWatchedEntity>): Promise<MovieWatchedEntity> {
        return this.movieService.delete(movieWatchedData.id);
    }
}