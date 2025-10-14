import { Director } from '../../domain/entities/director.entity';
import { DirectorDto } from '../dtos/director.dto';

export const toDirectorDto = (d: Director): DirectorDto => ({
  id: d.id,
  name: d.name,
  nationality: d.nationality,
  birthYear: d.birthYear,
});
