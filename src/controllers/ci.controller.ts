import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { CIService } from 'src/services/ci.service';

@Controller("api/ci")
export class CIController {
    constructor(private readonly service: CIService) { }

    @Get("/build")
    async build(@Res() res: Response, @Query("id") id: string) {
        const message = await this.service.build(id);
        res.status(HttpStatus.OK).json({ message });
    }

    @Get("/deploy")
    async deploy(@Res() res: Response, @Query("id") id: string) {
        const message = await this.service.deploy(id);
        res.status(HttpStatus.OK).json({ message });
    }
}
