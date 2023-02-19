import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { FavoriteModule } from 'src/favorite/favorite.module';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => FavoriteModule)],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
