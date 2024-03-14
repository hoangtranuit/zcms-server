import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateModuleDto } from '../dto';
import { AppModel, ModuleModel } from 'src/models';

@Injectable()
export class ModuleService {
    async create(id: string, dto: CreateModuleDto): Promise<string> {
        try {
            const dir = await AppModel.findDir(id);
            if (!dir) {
                throw new HttpException("Project Id not found", HttpStatus.NOT_FOUND);
            }

            await ModuleModel.create(dir, dto);
            return id;
        } catch (e: any) {
            throw new HttpException(e.message, HttpStatus.NOT_FOUND)
        }
    }

    async update(id: string, name: string, dto: CreateModuleDto): Promise<string> {
        try {
            const dir = await AppModel.findDir(id);
            if (!dir) {
                throw new HttpException("Project Id not found", HttpStatus.NOT_FOUND);
            }

            await ModuleModel.update(name, dir, dto);
            return id;
        } catch (e: any) {
            throw new HttpException(e.message, HttpStatus.NOT_FOUND)
        }
    }

    async delete(id: string, name: string): Promise<string> {
        try {
            const dir = await AppModel.findDir(id);
            if (!dir) {
                throw new HttpException("Project Id not found", HttpStatus.NOT_FOUND);
            }

            await ModuleModel.delete(name, dir);
            return id;
        } catch (e: any) {
            throw new HttpException(e.message, HttpStatus.NOT_FOUND)
        }
    }
}
