import { DirectorRepository } from '../../domain/repositories/director.repository';
import { Director } from '../../domain/entities/director.entity';
import { PrismaService } from '../persistence/prisma.service';

export class PrismaDirectorRepository implements DirectorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(director: Director): Promise<Director> {
    const created = await this.prisma.director.upsert({
      where: { id: director.id },
      update: { name: director.name, nationality: director.nationality, birthYear: director.birthYear },
      create: { name: director.name, nationality: director.nationality, birthYear: director.birthYear },
    });
    return new Director(created.id, created.name, created.nationality, created.birthYear);
  }

  async findById(id: string): Promise<Director | null> {
    const found = await this.prisma.director.findUnique({
      where: { id },
    });
    if (!found) {
      return null;
    }
    return new Director(found.id, found.name, found.nationality, found.birthYear);
  }

  async findAll(): Promise<Director[]> {
    const directors = await this.prisma.director.findMany();
    return directors.map((dir: Director) => new Director(dir.id, dir.name, dir.nationality, dir.birthYear));
  }

  async delete(id: string): Promise<Director | null> {
    const found = await this.prisma.director.delete({
      where: { id },
    });
    if (!found) {
      return null;
    }
    return found;
  }
}