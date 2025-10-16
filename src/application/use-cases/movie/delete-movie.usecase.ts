import { MovieRepository } from '../../../domain/repositories/movie.repository';
import { Movie } from '../../../domain/entities/movie.entity';
import { DeleteMovieDto } from '../../dtos/movie/delete-movie.dto';

export class DeleteMovieUseCase {
  constructor(private readonly movieRepo: MovieRepository) {}

  async execute(input: DeleteMovieDto): Promise<Movie | null> {
    const id = input.id.trim();
    if (!id) {
        throw new Error('The ID field is required.');
    }
    return this.movieRepo.delete(input.id);
  }
}
