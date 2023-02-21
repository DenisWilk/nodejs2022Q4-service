import {
  IsString,
  IsNotEmpty,
  IsInt,
  ValidateIf,
  IsUUID,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  artistId: string | null;
}

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {}
