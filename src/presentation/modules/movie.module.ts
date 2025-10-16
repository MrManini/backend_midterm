import { Delete, Module } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/persistence/prisma.service';
import { PrismaMovieRepository } from '../../infrastructure/repositories/prisma-movie.repository';
import { MoviesController } from '../controllers/movies.controller';
import { MOVIE_REPOSITORY } from '../../application/tokens';
import { CreateMovieUseCase } from '../../application/use-cases/movie/create-movie.usecase';
import { ListMoviesUseCase } from '../../application/use-cases/movie/list-movies.usecase';
import { FindMovieByIdUseCase } from 'src/application/use-cases/movie/find-movie-by-id.usecase';
import { DeleteMovieUseCase } from 'src/application/use-cases/movie/delete-movie.usecase';
import { UpdateMovieUseCase } from 'src/application/use-cases/movie/update-movie.usecase';

const usePrisma = !!process.env.DATABASE_URL;

@Module({
  controllers: [MoviesController],
  providers: [
    ...([PrismaService]),
    {
      provide: MOVIE_REPOSITORY,
      useFactory: (prisma?: PrismaService) => {
        return new PrismaMovieRepository(prisma!);
      },
      inject: usePrisma ? [PrismaService] : [],
    },
    {
      provide: CreateMovieUseCase,
      useFactory: (repo: any) => new CreateMovieUseCase(repo),
      inject: [MOVIE_REPOSITORY],
    },
    {
      provide: ListMoviesUseCase,
      useFactory: (repo: any) => new ListMoviesUseCase(repo),
      inject: [MOVIE_REPOSITORY],
    },
    {
      provide: FindMovieByIdUseCase,
      useFactory: (repo: any) => new FindMovieByIdUseCase(repo),
      inject: [MOVIE_REPOSITORY],
    },
    {
      provide: DeleteMovieUseCase,
      useFactory: (repo: any) => new DeleteMovieUseCase(repo),
      inject: [MOVIE_REPOSITORY],
    },
    {
      provide: UpdateMovieUseCase,
      useFactory: (repo: any) => new UpdateMovieUseCase(repo),
      inject: [MOVIE_REPOSITORY],
    },

  ],
})
export class MovieModule {}
