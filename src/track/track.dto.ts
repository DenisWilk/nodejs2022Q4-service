import {
  IsString,
  IsNotEmpty,
  ValidateIf,
  IsUUID,
  IsInt,
  IsPositive,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  artistId: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  albumId: string | null;

  @IsInt()
  @IsPositive()
  duration: number;
}

export class UpdateTrackDto extends PartialType(CreateTrackDto) {}
