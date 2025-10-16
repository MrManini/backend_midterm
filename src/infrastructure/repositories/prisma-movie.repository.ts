import { MovieRepository } from '../../domain/repositories/movie.repository';
import { Movie } from '../../domain/entities/movie.entity';
import { PrismaService } from '../persistence/prisma.service';

export class PrismaMovieRepository implements MovieRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(movie: Movie): Promise<Movie> {
    const created = await this.prisma.movie.upsert({
      where: { id: movie.id },
      update: { title: movie.title, year: movie.year, directorId: movie.directorId },
      create: { title: movie.title, year: movie.year, directorId: movie.directorId },
    });
    return new Movie(created.id, created.title, created.year, created.directorId);
  }

  async findById(id: string): Promise<Movie | null> {
    const found = await this.prisma.movie.findUnique({
      where: { id },
    });
    if (!found) {
      return null;
    }
    return new Movie(found.id, found.title, found.year, found.directorId);
  }

  async findAll(): Promise<Movie[]> {
    const movies = await this.prisma.movie.findMany();
    return movies.map((dir: Movie) => new Movie(dir.id, dir.title, dir.year, dir.directorId));
  }

  async delete(id: string): Promise<Movie | null> {
    const found = await this.prisma.movie.delete({
      where: { id },
    });
    if (!found) {
      return null;
    }
    return found;
  }
}