import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}

export class UpdateArtistDto extends PartialType(CreateArtistDto) {}
