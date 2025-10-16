import { DirectorRepository } from '../../../domain/repositories/director.repository';
import { Director } from '../../../domain/entities/director.entity';

export class ListDirectorsUseCase {
  constructor(private readonly directorRepo: DirectorRepository) {}

  async execute(): Promise<Director[] | null> {
    return this.directorRepo.findAll();
  }
}
