import { MovieRepository } from '../../../domain/repositories/movie.repository';
import { Movie } from '../../../domain/entities/movie.entity';
import { UpdateMovieDto } from '../../dtos/movie/update-movie.dto';

export class UpdateMovieUseCase {
  constructor(private readonly movieRepo: MovieRepository) {}

  async execute(input: UpdateMovieDto): Promise<Movie> {
    const id = input.id.trim();
    const title = input.title.trim();
    const year = input.year;
    const directorId = input.directorId.trim();
    if (!id || !title || !year || !directorId) {
      throw new Error('All fields are required.');
    }
    const movie = new Movie(id, title, year, directorId);

    return this.movieRepo.save(movie);
  }
}
