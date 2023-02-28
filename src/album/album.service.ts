import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { Album } from './album.entity';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Album[]> {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new NotFoundException('Error! Album not found.');
    }

    return album;
  }

  async create(CreateAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.prisma.album.create({ data: CreateAlbumDto });
  }

  async update(id: string, UpdateAlbumDto: UpdateAlbumDto): Promise<Album> {
    try {
      return await this.prisma.album.update({
        where: { id },
        data: UpdateAlbumDto,
      });
    } catch (error) {
      throw new NotFoundException('Error! Album not found.');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.album.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Error! Album not found.');
    }
  }
}
