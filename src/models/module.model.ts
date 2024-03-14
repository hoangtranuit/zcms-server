import { copy, ensureDir, exists, remove, writeFile } from "fs-extra";
import { join } from "path";
import { CreateModuleDto } from "src/dto";

export class ModuleModel {
    static _execute = async (name: string, dir: string, dto: CreateModuleDto): Promise<boolean> => {
        const path = join(dir, `src/modules/${name}`);
        await ensureDir(path);

        const src = join(process.cwd(), 'templates/module');
        await copy(src, path);

        const _path = join(path, 'schema.json');
        await writeFile(_path, JSON.stringify(dto.schema, null, 2));

        return Promise.resolve(true);
    }

    static create = async (dir: string, dto: CreateModuleDto): Promise<boolean> => {
        const name = dto.name;
        return this._execute(name, dir, dto);
    }

    static update = async (name: string, dir: string, dto: CreateModuleDto): Promise<boolean> => {
        const existed = await this.exists(name, dir);

        if (!existed) {
            throw Error("Module was not found");
        }

        return this._execute(name, dir, dto);
    }

    static delete = async (name: string, dir: string): Promise<void> => {
        const existed = await this.exists(name, dir);

        if (!existed) {
            throw Error("Module was not found");
        }
        const path = join(dir, `src/modules/${name}`);

        return remove(path);
    }

    static exists = async (name: string, dir: string): Promise<boolean> => {
        const path = join(dir, `src/modules/${name}`);
        return exists(path)
    }
}