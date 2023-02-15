import { IsInt, IsNotEmpty, IsString, NotEquals } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @NotEquals(undefined)
  artistId: string | null;

  @NotEquals(undefined)
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @NotEquals(undefined)
  artistId: string | null;

  @NotEquals(undefined)
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}
