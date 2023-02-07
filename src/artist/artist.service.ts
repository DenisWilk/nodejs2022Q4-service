import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './artist.entity';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { FavoriteService } from 'src/favorite/favorite.service';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ArtistService {
  constructor(
    private database: DatabaseService,
    @Inject(TrackService)
    private readonly trackService: TrackService,
    @Inject(AlbumService)
    private readonly albumService: AlbumService,
    @Inject(FavoriteService)
    private readonly favoriteService: FavoriteService,
  ) {}

  findAll() {
    return this.database.artists;
  }

  findOne(id: string) {
    const artist = this.database.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException('Error! Artist not found.');
    }

    return artist;
  }

  create(createArtistDto: CreateArtistDto) {
    const artist = new Artist(
      uuidv4(),
      createArtistDto.name,
      createArtistDto.grammy,
    );

    this.database.artists.push(artist);

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistIndex = this.database.artists.findIndex(
      (index) => index.id === id,
    );

    if (artistIndex === -1) {
      throw new NotFoundException('Error! Artist not found.');
    }

    const artist = this.database.artists[artistIndex];

    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;

    return artist;
  }

  delete(id: string) {
    const artist = this.database.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException('Error! Artist not found.');
    }

    this.database.artists = this.database.artists.filter(
      (artist) => artist.id !== id,
    );

    const tracks = this.trackService.findAll();

    tracks.forEach((track) => {
      if (track.artistId === id) {
        const updateTrackDto = {
          id: track.id,
          name: track.name,
          artistId: null,
          albumId: track.albumId,
          duration: track.duration,
        };

        this.trackService.update(track.id, updateTrackDto);
      }
    });

    const albums = this.albumService.findAll();

    albums.forEach((album) => {
      if (album.albumId === id) {
        const updateAlbumDto = {
          id: album.id,
          name: album.name,
          year: album.year,
          artistId: null,
        };

        this.albumService.update(album.id, updateAlbumDto);
      }
    });

    this.favoriteService.deleteArtist(id, true);
  }
}
