import { IsInt, IsNotEmpty, IsString, NotEquals } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @NotEquals(null)
  artistId: string | null;

  @NotEquals(null)
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @NotEquals(null)
  artistId: string | null;

  @NotEquals(null)
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}
