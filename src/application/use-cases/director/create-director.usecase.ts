import { randomUUID } from 'crypto';
import { DirectorRepository } from '../../../domain/repositories/director.repository';
import { Director } from '../../../domain/entities/director.entity';
import { CreateDirectorDto } from '../../dtos/director/create-director.dto';

export class CreateDirectorUseCase {
  constructor(private readonly directorRepo: DirectorRepository) {}

  async execute(input: CreateDirectorDto): Promise<Director> {
    const name = input.name.trim();
    const nationality = input.nationality.trim();
    const birthYear = input.birthYear;
    if (!name || !nationality || !birthYear) {
      throw new Error('All fields are required.');
    }
    const director = new Director(randomUUID(), name, nationality, birthYear);

    return this.directorRepo.save(director);
  }
}
