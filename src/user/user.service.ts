import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.users.findMany();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.users.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('Error! User not found.');
    }

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.prisma.users.create({ data: createUserDto });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.prisma.users.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      throw new NotFoundException('Error! User not found.');
    }
  }

  async delete(id: string): Promise<User> {
    try {
      return await this.prisma.users.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Error! User not found.');
    }
  }
}
