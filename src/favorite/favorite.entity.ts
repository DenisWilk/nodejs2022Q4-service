import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';

export class Favorite {
  artists: ArtistModule[];
  albums: AlbumModule[];
  tracks: TrackModule[];

  constructor(
    artists: ArtistModule[],
    albums: AlbumModule[],
    tracks: TrackModule[],
  ) {
    this.artists = artists;
    this.albums = albums;
    this.tracks = tracks;
  }
}
