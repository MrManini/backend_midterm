import { Delete, Module } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/persistence/prisma.service';
import { PrismaDirectorRepository } from '../../infrastructure/repositories/prisma-director.repository';
import { DirectorsController } from '../controllers/directors.controller';
import { DIRECTOR_REPOSITORY } from '../../application/tokens';
import { CreateDirectorUseCase } from '../../application/use-cases/create-director.usecase';
import { ListDirectorsUseCase } from '../../application/use-cases/list-directors.usecase';
import { FindDirectorByIdUseCase } from 'src/application/use-cases/find-director-by-id.usecase';
import { DeleteDirectorUseCase } from 'src/application/use-cases/delete-director.usecase';
import { UpdateDirectorUseCase } from 'src/application/use-cases/update-director.usecase';

const usePrisma = !!process.env.DATABASE_URL;

@Module({
  controllers: [DirectorsController],
  providers: [
    ...([PrismaService]),
    {
      provide: DIRECTOR_REPOSITORY,
      useFactory: (prisma?: PrismaService) => {
        return new PrismaDirectorRepository(prisma!);
      },
      inject: usePrisma ? [PrismaService] : [],
    },
    {
      provide: CreateDirectorUseCase,
      useFactory: (repo: any) => new CreateDirectorUseCase(repo),
      inject: [DIRECTOR_REPOSITORY],
    },
    {
      provide: ListDirectorsUseCase,
      useFactory: (repo: any) => new ListDirectorsUseCase(repo),
      inject: [DIRECTOR_REPOSITORY],
    },
    {
      provide: FindDirectorByIdUseCase,
      useFactory: (repo: any) => new FindDirectorByIdUseCase(repo),
      inject: [DIRECTOR_REPOSITORY],
    },
    {
      provide: DeleteDirectorUseCase,
      useFactory: (repo: any) => new DeleteDirectorUseCase(repo),
      inject: [DIRECTOR_REPOSITORY],
    },
    {
      provide: UpdateDirectorUseCase,
      useFactory: (repo: any) => new UpdateDirectorUseCase(repo),
      inject: [DIRECTOR_REPOSITORY],
    },
  ],
})
export class DirectorModule {}
