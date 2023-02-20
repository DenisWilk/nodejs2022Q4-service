import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
import { Track } from './track.entity';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Track[]> {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new NotFoundException('Error! Track not found.');
    }

    return track;
  }

  async create(CreateTrackDto: CreateTrackDto): Promise<Track> {
    return await this.prisma.track.create({ data: CreateTrackDto });
  }

  async update(id: string, UpdateTrackDto: UpdateTrackDto): Promise<Track> {
    try {
      return await this.prisma.track.update({
        where: { id },
        data: UpdateTrackDto,
      });
    } catch (error) {
      throw new NotFoundException('Error! Track not found.');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.track.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Error! Track not found.');
    }
  }
}
