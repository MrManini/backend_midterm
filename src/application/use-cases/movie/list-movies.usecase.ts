import { MovieRepository } from '../../../domain/repositories/movie.repository';
import { Movie } from '../../../domain/entities/movie.entity';

export class ListMoviesUseCase {
  constructor(private readonly movieRepo: MovieRepository) {}

  async execute(): Promise<Movie[] | null> {
    return this.movieRepo.findAll();
  }
}
