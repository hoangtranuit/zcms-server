import { Module } from '@nestjs/common';
import { AppController, ModuleController } from './controllers';
import { AppService, ModuleService } from './services';
import { CIController } from './controllers/ci.controller';
import { CIService } from './services/ci.service';

@Module({
  imports: [],
  controllers: [AppController, ModuleController, CIController],
  providers: [AppService, ModuleService, CIService],
})
export class AppModule { }
