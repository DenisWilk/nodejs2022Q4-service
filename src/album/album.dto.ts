import { IsString, IsNotEmpty, IsInt, NotEquals } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @NotEquals(undefined)
  artistId: string | null;
}

export class UpdateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @NotEquals(undefined)
  artistId: string | null;
}
