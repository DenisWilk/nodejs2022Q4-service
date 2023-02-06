import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { ArtistsModule } from './artist/artist.module';
import { TracksModule } from './track/track.module';
import { AlbumsModule } from './album/album.module';
import { FavoritesModule } from './favorite/favorite.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
