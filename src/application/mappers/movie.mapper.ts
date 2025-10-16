import { Movie } from '../../domain/entities/movie.entity';
import { MovieDto } from '../dtos/movie/movie.dto';

export const toMovieDto = (m: Movie): MovieDto => ({
  id: m.id,
  title: m.title,
  year: m.year,
  directorId: m.directorId,
});
