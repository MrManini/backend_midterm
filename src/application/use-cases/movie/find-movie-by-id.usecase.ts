import { MovieRepository } from '../../../domain/repositories/movie.repository';
import { Movie } from '../../../domain/entities/movie.entity';
import { FindMovieByIdDto } from '../../dtos/movie/find-movie-by-id.dto';

export class FindMovieByIdUseCase {
  constructor(private readonly movieRepo: MovieRepository) {}

  async execute(input: FindMovieByIdDto): Promise<Movie | null> {
    const id = input.id.trim();
    if (!id) {
        throw new Error('The ID field is required.');
    }
    return this.movieRepo.findById(input.id);
  }
}
