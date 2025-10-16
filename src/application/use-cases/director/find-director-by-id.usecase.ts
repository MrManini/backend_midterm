import { DirectorRepository } from '../../../domain/repositories/director.repository';
import { Director } from '../../../domain/entities/director.entity';
import { FindDirectorByIdDto } from '../../dtos/director/find-director-by-id.dto';

export class FindDirectorByIdUseCase {
  constructor(private readonly directorRepo: DirectorRepository) {}

  async execute(input: FindDirectorByIdDto): Promise<Director | null> {
    const id = input.id.trim();
    if (!id) {
        throw new Error('The ID field is required.');
    }
    return this.directorRepo.findById(input.id);
  }
}
