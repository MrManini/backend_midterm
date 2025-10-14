import { Director } from '../entities/director.entity';

export interface DirectorRepository {
  save(director: Director): Promise<Director>;
  findById(id: string) : Promise <Director | null>;
  findAll(): Promise<Director[]>;
  delete(id: string) : Promise <Director | null>;
}
