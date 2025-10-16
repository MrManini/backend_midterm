import { Controller, Get, Post, Param, Body, BadRequestException, Delete, Put } from '@nestjs/common';
import { ApiProperty, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateDirectorUseCase } from '../../application/use-cases/director/create-director.usecase';
import { toDirectorDto } from '../../application/mappers/director.mapper';
import { ListDirectorsUseCase } from 'src/application/use-cases/director/list-directors.usecase';
import { FindDirectorByIdUseCase } from 'src/application/use-cases/director/find-director-by-id.usecase';
import { DeleteDirectorUseCase } from 'src/application/use-cases/director/delete-director.usecase';
import { UpdateDirectorUseCase } from 'src/application/use-cases/director/update-director.usecase';

class CreateDirectorRequest {
  @ApiProperty() name!: string;
  @ApiProperty() nationality!: string;
  @ApiProperty() birthYear!: number;
}

class DeleteDirectorRequest {
  @ApiProperty() id!: string;
}

@ApiTags('directors')
@Controller('directors')
export class DirectorsController {
  constructor(
    private readonly createDirector: CreateDirectorUseCase,
    private readonly listDirectors: ListDirectorsUseCase,
    private readonly findDirectorById: FindDirectorByIdUseCase,
    private readonly deleteDirector: DeleteDirectorUseCase,
    private readonly updateDirector: UpdateDirectorUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new director', description: 'Creates a director' })
  @ApiResponse({ status: 201, description: 'Director successfully created' })
  @ApiResponse({ status: 400, description: 'A required field is empty' })
  async create(@Body() body: CreateDirectorRequest) {
    try {
      const director = await this.createDirector.execute({name: body.name, nationality: body.nationality, birthYear: body.birthYear});
      return toDirectorDto(director);
    } catch (error) {
      if (error instanceof Error && error.message.includes('required')) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all directors', description: 'Gets a list of all existing directors'})
  @ApiResponse({ status: 200, description: 'Director list succesfully returned' })
  async list() {
    const directorList = await this.listDirectors.execute();
    return directorList;
  }
  

  @Get(':id')
  @ApiOperation({ summary: 'Get a director by their ID', description: 'Gets a director by their ID'})
  @ApiResponse({ status: 200, description: 'Director data succesfully retrieved'})
  @ApiResponse({ status: 400, description: 'The ID field is empty'})
  async getById(@Param('id') id: string) {
    try {
      const director = await this.findDirectorById.execute({id: id});
      return director;
    } catch (error) {
      if (error instanceof Error && error.message.includes('required')) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a director by their ID', description: 'Deletes a director by their ID'})
  @ApiResponse({ status: 200, description: 'Director data succesfully deleted'})
  @ApiResponse({ status: 400, description: 'The ID field is empty'})
  async delete(@Body() body: DeleteDirectorRequest) {
    try {
      const director = await this.deleteDirector.execute({id: body.id});
      return director;
    } catch (error) {
      if (error instanceof Error && error.message.includes('required')) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a director by their ID', description: 'Updates a director by their ID'})
  @ApiResponse({ status: 200, description: 'Director data succesfully updated'})
  @ApiResponse({ status: 400, description: 'A required field is empty'})
  async update(@Param('id') id: string, @Body() body: CreateDirectorRequest) {
    try {
      const director = await this.updateDirector.execute({id: id, name: body.name, nationality: body.nationality, birthYear: body.birthYear});
      return toDirectorDto(director);
    } catch (error) {
      if (error instanceof Error && error.message.includes('required')) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}