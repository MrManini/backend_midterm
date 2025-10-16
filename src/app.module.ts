import { Module } from '@nestjs/common';
import { DirectorModule } from './presentation/modules/director.module';
import { MovieModule } from './presentation/modules/movie.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DirectorModule, MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}