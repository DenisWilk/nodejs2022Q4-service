import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Artist } from './artist.entity';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';


@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Artist[]> {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new NotFoundException('Error! Artist not found.');
    }

    return artist;
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.prisma.artist.create({ data: createArtistDto });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    try {
      return await this.prisma.artist.update({
        where: { id },
        data: updateArtistDto,
      });
    } catch (error) {
      throw new NotFoundException('Error! Artist not found.');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.artist.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Error! Artist not found.');
    }
  }
}