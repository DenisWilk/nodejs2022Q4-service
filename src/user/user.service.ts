import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import argon2 from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.prisma.user.findMany();

    return users.map((user) => {
      const { password, ...data } = user;
      return data;
    });
  }

  async findOne(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('Error! User not found.');
    }

    const { password, ...data } = user;
    return data;
  }

  async create(CreateUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const newUser = await this.prisma.user.create({
      data: {
        ...CreateUserDto,
        version: 1,
      },
    });

    return newUser;
  }

  async update(
    id: string,
    UpdateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('Error! User not found.');
    }

    const truePassword = await argon2.verify(
      user.password,
      UpdateUserDto.oldPassword,
    );

    if (!truePassword) {
      throw new ForbiddenException('Error! Wrong password.');
    }

    const newPassword = await argon2.hash(UpdateUserDto.newPassword);

    const data = await this.prisma.user.update({
      where: { id },
      data: { password: newPassword },
    });

    const { password, ...editedUser } = data;
    return editedUser;
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Error! User not found.');
    }
  }
}
