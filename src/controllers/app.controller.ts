import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from '../services/app.service';
import { createReadStream } from 'fs';
import { CreateProjectDto } from '../dto';
import { remove } from 'fs-extra';

@Controller("api/project")
export class AppController {
  constructor(private readonly service: AppService) { }

  @Get()
  async get(@Res() res: Response) {
    res.status(HttpStatus.OK).json({ message: "ok" });
  }

  @Post("/create")
  async create(@Res() res: Response, @Body() dto: CreateProjectDto) {
    const id = await this.service.create(dto);
    res.status(HttpStatus.OK).json({ message: "created", id });
  }

  @Post("/update")
  async update(
    @Res() res: Response,
    @Body() dto: CreateProjectDto,
    @Query("id") id: string
  ) {
    await this.service.update(id, dto);
    res.status(HttpStatus.OK).json({ message: "updated", id });
  }

  @Post("/delete")
  async delete(@Res() res: Response, @Query("id") id: string
  ) {
    await this.service.delete(id);
    res.status(HttpStatus.OK).json({ message: "deleted", id });
  }

  @Get("/download")
  async download(@Res() res: Response, @Query("id") id: string) {
    const zipPath = await this.service.zip(id);

    const file = createReadStream(zipPath);
    res.header('Content-Disposition', 'attachment; filename="app.zip"');
    const stream = file.pipe(res);

    stream.on('finish', function () {
      // remove zip file
      remove(zipPath);
    });
  }
}
