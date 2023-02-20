import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Omit<Favorite, 'id'>> {
    const [item] = await this.prisma.favorite.findMany({
      select: {
        artists: {
          select: { id: true, name: true, grammy: true },
        },
        albums: {
          select: { id: true, name: true, year: true, artistId: true },
        },
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            artistId: true,
            albumId: true,
          },
        },
      },
    });

    if (!item) {
      return {
        artists: [],
        albums: [],
        tracks: [],
      };
    }

    return item;
  }

  async add(type: string, id: string): Promise<void> {
    const item = await this.prisma[type].findFirst({ where: { id } });

    if (!item) {
      throw new UnprocessableEntityException('Error! Id not found.');
    }

    const favorite = await this.prisma.favorite.findMany();

    if (!favorite.length) {
      const createdFavs = await this.prisma.favorite.create({ data: {} });

      await this.prisma[type].update({
        where: { id },
        data: { favoriteId: createdFavs.id },
      });
    } else {
      await this.prisma[type].update({
        where: { id },
        data: { favoriteId: favorite[0].id },
      });
    }

    return item;
  }

  async delete(type: string, id: string): Promise<void> {
    try {
      await this.prisma[type].update({
        where: { id },
        data: { favoriteId: { set: null } },
      });
    } catch (error) {
      throw new NotFoundException('Error! Id not found.');
    }
  }
}
