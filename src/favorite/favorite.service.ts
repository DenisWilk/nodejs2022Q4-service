import {
  Injectable,
  Inject,
  forwardRef,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(
    private database: DatabaseService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
  ) {}

  findAll() {
    const artists = this.database.favs.artists.map((id) =>
      this.artistService.findOne(id),
    );

    const tracks = this.database.favs.tracks.map((id) =>
      this.trackService.findOne(id),
    );

    const albums = this.database.favs.albums.map((id) =>
      this.albumService.findOne(id),
    );

    const favorites = new Favorite(artists, albums, tracks);

    return favorites;
  }

  addArtist(id: string) {
    const artist = this.database.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new UnprocessableEntityException('Error! Artist not found.');
    }

    this.database.favs.artists.push(id);

    return { message: 'Artist added successfully.' };
  }

  addTrack(id: string) {
    const track = this.database.tracks.find((track) => track.id === id);

    if (!track) {
      throw new UnprocessableEntityException('Error! Track not found.');
    }

    this.database.favs.tracks.push(id);

    return { message: 'Track added successfully.' };
  }

  addAlbum(id: string) {
    const album = this.database.albums.find((album) => album.id === id);

    if (!album) {
      throw new UnprocessableEntityException('Error! Album not found.');
    }

    this.database.favs.albums.push(id);

    return { message: 'Album added successfully.' };
  }

  deleteArtist(id: string, skipHttpError = false) {
    const artist = this.database.favs.artists.find((el) => el === id);

    if (!artist && !skipHttpError) {
      throw new NotFoundException(
        'Error! This artist is not tagged as a favorite.',
      );
    }

    this.database.favs.artists = this.database.favs.artists.filter(
      (el) => el !== id,
    );
  }

  deleteTrack(id: string, skipHttpError = false) {
    const track = this.database.favs.tracks.find((el) => el === id);

    if (!track && !skipHttpError) {
      throw new NotFoundException(
        'Error! This track is not tagged as a favorite.',
      );
    }

    this.database.favs.tracks = this.database.favs.tracks.filter(
      (el) => el !== id,
    );
  }

  deleteAlbum(id: string, skipHttpError = false) {
    const album = this.database.favs.albums.find((el) => el === id);

    if (!album && !skipHttpError) {
      throw new NotFoundException(
        'Error! This album is not tagged as a favorite.',
      );
    }

    this.database.favs.albums = this.database.favs.albums.filter(
      (el) => el !== id,
    );
  }
}
