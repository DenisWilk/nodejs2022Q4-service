import {
  Controller,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Delete,
  Param,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  createArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoriteService.addArtist(id);
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  createTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoriteService.addTrack(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  createAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoriteService.addAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoriteService.deleteArtist(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoriteService.deleteTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoriteService.deleteAlbum(id);
  }
}
