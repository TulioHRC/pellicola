import { Controller, Get, Post, Body } from '@nestjs/common'
import { MovieWatchedService } from 'src/services/MovieWatched.service'
import { MovieWatched } from 'src/entity/MovieWatched.entity'


@Controller('api')
export class ApiController {
    constructor(private readonly movieService: MovieWatchedService) {}

    @Get()
    findAll(): Promise<MovieWatched[]> {
        return this.movieService.findAll();
    }

    @Post()
    create(@Body() movieWatchedData: Partial<MovieWatched>): Promise<MovieWatched> {
        return this.movieService.create(movieWatchedData)
    }
}