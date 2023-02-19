import {
  Injectable,
  Inject,
  forwardRef,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from 'src/database/database.service';
import { TrackService } from 'src/track/track.service';
import { FavoriteService } from 'src/favorite/favorite.service';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { Album } from './album.entity';

@Injectable()
export class AlbumService {
  constructor(
    private database: DatabaseService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavoriteService))
    private readonly favoriteService: FavoriteService,
  ) {}

  findAll() {
    return this.database.albums;
  }

  findOne(id: string) {
    const album = this.database.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException('Error! Album not found.');
    }

    return album;
  }

  create(createAlbumDto: CreateAlbumDto) {
    if (
      (typeof createAlbumDto.artistId === 'string' &&
        createAlbumDto.artistId.length !== 0) ||
      (typeof createAlbumDto.artistId !== 'string' &&
        createAlbumDto.artistId === null)
    ) {
      let artistId = null;

      const artist = this.database.artists.find(
        (el) => el.id === createAlbumDto.artistId,
      );

      if (artist) {
        artistId = createAlbumDto.artistId;
      }

      const album = new Album(
        uuidv4(),
        createAlbumDto.name,
        createAlbumDto.year,
        artistId,
      );

      this.database.albums.push(album);

      return album;
    } else {
      if (
        typeof createAlbumDto.artistId === 'string' &&
        createAlbumDto.artistId.length === 0
      ) {
        throw new BadRequestException('Please fill in the fields: artistId.');
      }
      if (typeof createAlbumDto.artistId !== 'string') {
        throw new BadRequestException('Field value must be a string.');
      } else {
        throw new BadRequestException('Please fill in the fields: artistId.');
      }
    }
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const index = this.database.albums.findIndex((el) => el.id === id);

    if (index === -1) {
      throw new NotFoundException('Error! Album not found.');
    }

    if (
      (typeof updateAlbumDto.artistId === 'string' &&
        updateAlbumDto.artistId.length !== 0) ||
      (typeof updateAlbumDto.artistId !== 'string' &&
        updateAlbumDto.artistId === null)
    ) {
      let artistId = null;

      const artist = this.database.artists.find(
        (el) => el.id === updateAlbumDto.artistId,
      );

      if (artist) {
        artistId = updateAlbumDto.artistId;
      }

      const album = this.database.albums[index];

      album.name = updateAlbumDto.name;
      album.year = updateAlbumDto.year;
      album.artistId = artistId;

      return album;
    } else {
      if (
        typeof updateAlbumDto.artistId === 'string' &&
        updateAlbumDto.artistId.length === 0
      ) {
        throw new BadRequestException('Please fill in the fields: artistId.');
      }
      if (typeof updateAlbumDto.artistId !== 'string') {
        throw new BadRequestException('Field value must be a string.');
      } else {
        throw new BadRequestException('Please fill in the fields: artistId.');
      }
    }
  }

  delete(id: string) {
    const album = this.database.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException('Error! Album not found.');
    }

    this.database.albums = this.database.albums.filter((el) => el.id !== id);

    const tracks = this.trackService.findAll();

    tracks.forEach((track) => {
      if (track.albumId === id) {
        const updateTrackDto = {
          id: track.id,
          name: track.name,
          artistId: track.artistId,
          albumId: null,
          duration: track.duration,
        };

        this.trackService.update(track.id, updateTrackDto);
      }
    });

    this.favoriteService.deleteAlbum(id, true);
  }
}
