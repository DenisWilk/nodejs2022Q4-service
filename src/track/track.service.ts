import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from 'src/database/database.service';
import { FavoriteService } from 'src/favorite/favorite.service';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
import { Track } from './track.entity';

@Injectable()
export class TrackService {
  constructor(
    private database: DatabaseService,
    @Inject(FavoriteService)
    private readonly favoriteService: FavoriteService,
  ) {}

  findAll() {
    return this.database.tracks;
  }

  findOne(id: string) {
    const track = this.database.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException('Error! Track not found.');
    }

    return track;
  }

  create(createTrackDto: CreateTrackDto) {
    if (
      ((typeof createTrackDto.artistId === 'string' &&
        createTrackDto.artistId.length !== 0) ||
        (typeof createTrackDto.artistId !== 'string' &&
          createTrackDto.artistId === null)) &&
      ((typeof createTrackDto.albumId === 'string' &&
        createTrackDto.albumId.length !== 0) ||
        (typeof createTrackDto.albumId !== 'string' &&
          createTrackDto.albumId === null))
    ) {
      let artistId = null;
      let albumId = null;

      const artist = this.database.artists.find(
        (el) => el.id === createTrackDto.artistId,
      );

      const album = this.database.albums.find(
        (el) => el.id === createTrackDto.albumId,
      );

      if (artist) {
        artistId = createTrackDto.artistId;
      }

      if (album) {
        albumId = createTrackDto.albumId;
      }

      const track = new Track(
        uuidv4(),
        createTrackDto.name,
        artistId,
        albumId,
        createTrackDto.duration,
      );

      this.database.tracks.push(track);

      return track;
    } else {
      throw new BadRequestException(
        'Please fill in the fields: artistId and albumId.',
      );
    }
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const index = this.database.tracks.findIndex((el) => el.id === id);

    if (index === -1) {
      throw new NotFoundException('Error! Track not found.');
    }

    if (
      ((typeof updateTrackDto.artistId === 'string' &&
        updateTrackDto.artistId.length !== 0) ||
        (typeof updateTrackDto.artistId !== 'string' &&
          updateTrackDto.artistId === null)) &&
      ((typeof updateTrackDto.albumId === 'string' &&
        updateTrackDto.albumId.length !== 0) ||
        (typeof updateTrackDto.albumId !== 'string' &&
          updateTrackDto.albumId === null))
    ) {
      let artistId = null;
      let albumId = null;

      const artist = this.database.artists.find(
        (el) => el.id === updateTrackDto.artistId,
      );

      const album = this.database.albums.find(
        (el) => el.id === updateTrackDto.albumId,
      );

      if (artist) {
        artistId = updateTrackDto.artistId;
      }

      if (album) {
        albumId = updateTrackDto.albumId;
      }

      const track = this.database.tracks[index];

      track.name = updateTrackDto.name;
      track.albumId = albumId;
      track.artistId = artistId;
      track.duration = updateTrackDto.duration;

      return track;
    } else {
      throw new BadRequestException(
        'Please fill in the fields: artistId and albumId.',
      );
    }
  }

  delete(id: string) {
    const track = this.database.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException('Error! Track not found.');
    }

    this.database.tracks = this.database.tracks.filter((el) => el.id !== id);

    this.favoriteService.deleteTrack(id, true);
  }
}
