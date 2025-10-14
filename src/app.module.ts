import { Module } from '@nestjs/common';
import { DirectorModule } from './presentation/modules/director.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DirectorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}