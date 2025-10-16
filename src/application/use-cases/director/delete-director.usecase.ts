import { DirectorRepository } from '../../../domain/repositories/director.repository';
import { Director } from '../../../domain/entities/director.entity';
import { DeleteDirectorDto } from '../../dtos/director/delete-director.dto';

export class DeleteDirectorUseCase {
  constructor(private readonly directorRepo: DirectorRepository) {}

  async execute(input: DeleteDirectorDto): Promise<Director | null> {
    const id = input.id.trim();
    if (!id) {
        throw new Error('The ID field is required.');
    }
    return this.directorRepo.delete(input.id);
  }
}
