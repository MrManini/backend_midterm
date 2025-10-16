import { randomUUID } from 'crypto';
import { MovieRepository } from '../../../domain/repositories/movie.repository';
import { Movie } from '../../../domain/entities/movie.entity';
import { CreateMovieDto } from '../../dtos/movie/create-movie.dto';

export class CreateMovieUseCase {
  constructor(private readonly movieRepo: MovieRepository) {}

  async execute(input: CreateMovieDto): Promise<Movie> {
    const title = input.title.trim();
    const year = input.year;
    const directorId = input.directorId.trim();
    if (!title || !year || !directorId) {
      throw new Error('All fields are required.');
    }
    const director = new Movie(randomUUID(), title, year, directorId);

    return this.movieRepo.save(director);
  }
}
