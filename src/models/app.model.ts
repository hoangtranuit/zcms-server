import { Project } from "./entities"
import { copy, exists, readFile, remove, writeFile, ensureDir } from "fs-extra";
import { join } from "path";
import { CreateProjectDto } from "src/dto";
import { zip } from "zip-a-folder";
import * as short from "short-uuid";

export class AppModel {
    static create = async (dto: CreateProjectDto): Promise<Project> => {
        const id = short.generate();
        const root = process.cwd();
        // copy template to outputs 
        const src = join(root, 'templates/project');
        const out = join(root, `outputs/${id}`);

        await ensureDir(join(root, 'outputs'));
        await ensureDir(out);
        await copy(src, out);

        // clone package.json with app name
        const path = join(src, "package.json");
        const json = await readFile(path, 'utf8');
        const object = JSON.parse(json);

        // project.json config
        const projectConfig = join(out, "src/project.json");
        await writeFile(projectConfig, JSON.stringify(dto, null, 2));

        const _path = join(out, "package.json");
        await writeFile(_path, JSON.stringify(object, null, 2));

        return Promise.resolve(new Project(id, path));
    }

    static update = async (id: string, dto: CreateProjectDto): Promise<boolean> => {
        const dir = await this.findDir(id);
        if (!dir) {
            throw Error("Project id was not found")
        }

        const path = join(dir, "src/project.json");
        await writeFile(path, JSON.stringify(dto, null, 2));

        return Promise.resolve(true);
    }

    static findDir = async (id: string): Promise<string> => {
        const root = process.cwd();
        const dir = join(root, `outputs/${id}`);
        const existed = await exists(dir);

        if (existed) {
            return Promise.resolve(dir);
        }

        return Promise.resolve("");
    }

    static delete = async (id: string): Promise<boolean> => {
        const dir = await this.findDir(id);
        if (!dir) {
            throw Error("Project id was not found")
        }

        await remove(dir);
        return Promise.resolve(true);
    }

    static zip = async (id: string): Promise<string> => {
        const dir = await this.findDir(id);
        if (!dir) {
            throw Error("Project id was not found")
        }

        // zip folder 
        const root = process.cwd();
        const out_zip = join(root, `outputs/${id}.zip`);
        await zip(dir, out_zip, { destPath: 'app/' });
        return Promise.resolve(out_zip);
    }
}