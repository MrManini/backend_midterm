import { Movie } from '../entities/movie.entity';

export interface MovieRepository {
  save(movie: Movie): Promise<Movie>;
  findById(id: string) : Promise <Movie | null>;
  findAll(): Promise<Movie[]>;
  delete(id: string) : Promise <Movie | null>;
}
