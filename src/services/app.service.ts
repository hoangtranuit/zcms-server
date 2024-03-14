import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from '../dto';
import { AppModel } from 'src/models/app.model';

@Injectable()
export class AppService {
  constructor() { }
  async create(dto: CreateProjectDto): Promise<string> {
    const project = await AppModel.create(dto)
    return project.id;
  }

  async update(id: string, dto: CreateProjectDto): Promise<string> {
    try {
      await AppModel.update(id, dto);
      return id;
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND)
    }
  }

  async delete(id: string): Promise<string> {
    try {
      await AppModel.delete(id);
      return id;

    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND)
    }
  }

  async zip(id: string): Promise<string> {
    try {
      const path = await AppModel.zip(id);
      return path;
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND)
    }
  }
}
