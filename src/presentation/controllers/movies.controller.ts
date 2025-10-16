import { Controller, Get, Post, Param, Body, BadRequestException, Delete, Put } from '@nestjs/common';
import { ApiProperty, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateMovieUseCase } from '../../application/use-cases/movie/create-movie.usecase';
import { toMovieDto } from '../../application/mappers/movie.mapper';
/*
import { ListMoviesUseCase } from 'src/application/use-cases/movie/list-movies.usecase';
import { FindMovieByIdUseCase } from 'src/application/use-cases/movie/find-movie-by-id.usecase';
import { DeleteMovieUseCase } from 'src/application/use-cases/movie/delete-movie.usecase';
import { UpdateMovieUseCase } from 'src/application/use-cases/movie/update-movie.usecase';
*/

class CreateMovieRequest {
  @ApiProperty() title!: string;
  @ApiProperty() year!: number;
  @ApiProperty() directorId!: string;
}

class DeleteMovieRequest {
  @ApiProperty() id!: string;
}

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(
    private readonly createMovie: CreateMovieUseCase,
    /*
    private readonly listMovies: ListMoviesUseCase,
    private readonly findMovieById: FindMovieByIdUseCase,
    private readonly deleteMovie: DeleteMovieUseCase,
    private readonly updateMovie: UpdateMovieUseCase,
    */
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new movie', description: 'Creates a movie' })
  @ApiResponse({ status: 201, description: 'Movie successfully created' })
  @ApiResponse({ status: 400, description: 'A required field is empty' })
  @ApiResponse({ status: 500, description: 'Director ID is invalid'})
  async create(@Body() body: CreateMovieRequest) {
    try {
      const movie = await this.createMovie.execute({ title: body.title, year: body.year, directorId: body.directorId });
      return toMovieDto(movie);
    } catch (error) {
      if (error instanceof Error && error.message.includes('required')) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  /*
  @Get()
  @ApiOperation({ summary: 'Get all movies', description: 'Gets a list of all existing movies'})
  @ApiResponse({ status: 200, description: 'Movie list succesfully returned' })
  async list() {
    const movieList = await this.listMovies.execute();
    return movieList;
  }
  

  @Get(':id')
  @ApiOperation({ summary: 'Get a movie by their ID', description: 'Gets a movie by their ID'})
  @ApiResponse({ status: 200, description: 'Movie data succesfully retrieved'})
  @ApiResponse({ status: 400, description: 'The ID field is empty'})
  async getById(@Param('id') id: string) {
    try {
      const movie = await this.findMovieById.execute({id: id});
      return movie;
    } catch (error) {
      if (error instanceof Error && error.message.includes('required')) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a movie by their ID', description: 'Deletes a movie by their ID'})
  @ApiResponse({ status: 200, description: 'Movie data succesfully deleted'})
  @ApiResponse({ status: 400, description: 'The ID field is empty'})
  async delete(@Body() body: DeleteMovieRequest) {
    try {
      const movie = await this.deleteMovie.execute({id: body.id});
      return movie;
    } catch (error) {
      if (error instanceof Error && error.message.includes('required')) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a movie by their ID', description: 'Updates a movie by their ID'})
  @ApiResponse({ status: 200, description: 'Movie data succesfully updated'})
  @ApiResponse({ status: 400, description: 'A required field is empty'})
  async update(@Param('id') id: string, @Body() body: CreateMovieRequest) {
    try {
      const movie = await this.updateMovie.execute({id: id, name: body.name, nationality: body.nationality, birthYear: body.birthYear});
      return toMovieDto(movie);
    } catch (error) {
      if (error instanceof Error && error.message.includes('required')) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
  */
}