
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as spawn from 'cross-spawn';
import { AppModel } from 'src/models';

@Injectable()
export class CIService {
    constructor() { }
    async build(id: string): Promise<string> {
        const dir = await AppModel.findDir(id);

        if (!dir) {
            throw new HttpException("Project Id was not found", HttpStatus.NOT_FOUND)
        }

        const proc = spawn.sync('npm', ['install'], { stdio: 'inherit', cwd: dir });

        if (proc.status !== 0) {
            return "install failed";
        }

        const proc2 = spawn.sync('npm', ['run', 'build'], { stdio: 'inherit', cwd: dir });

        if (proc2.status !== 0) {
            return "build failed";
        }

        return "done";
    }

    async deploy(id: string): Promise<string> {
        const dir = await AppModel.findDir(id);

        if (!dir) {
            throw new HttpException("Project Id was not found", HttpStatus.NOT_FOUND)
        }

        return "done";
    }
}

