import { Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateModuleDto } from '../dto';
import { ModuleService } from 'src/services';

@Controller("api/module")
export class ModuleController {
    constructor(private readonly service: ModuleService) { }

    @Get()
    async get(@Res() res: Response) {
        res.status(HttpStatus.OK).json({ message: "ok" });
    }

    @Post("/create")
    async create(@Res() res: Response, @Body() dto: CreateModuleDto, @Query('id') id: string) {
        const _id = await this.service.create(id, dto);
        res.status(HttpStatus.OK).json({ message: "created", id: _id });
    }

    @Post("/update")
    async update(
        @Res() res: Response,
        @Body() dto: CreateModuleDto,
        @Query('id') id: string,
        @Query('name') name: string,
    ) {
        await this.service.update(id, name, dto);
        res.status(HttpStatus.OK).json({ message: "updated" });
    }

    @Post("/delete")
    async delete(
        @Res() res: Response,
        @Query('id') id: string,
        @Query('name') name: string,
    ) {
        await this.service.delete(id, name);
        res.status(HttpStatus.OK).json({ message: "deleted" });
    }
}
