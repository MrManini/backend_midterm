import { DirectorRepository } from '../../../domain/repositories/director.repository';
import { Director } from '../../../domain/entities/director.entity';
import { UpdateDirectorDto } from '../../dtos/director/update-director.dto';

export class UpdateDirectorUseCase {
  constructor(private readonly directorRepo: DirectorRepository) {}

  async execute(input: UpdateDirectorDto): Promise<Director> {
    const id = input.id.trim();
    const name = input.name.trim();
    const nationality = input.nationality.trim();
    const birthYear = input.birthYear;
    if (!id || !name || !nationality || !birthYear) {
      throw new Error('All fields are required.');
    }
    const director = new Director(id, name, nationality, birthYear);

    return this.directorRepo.save(director);
  }
}
