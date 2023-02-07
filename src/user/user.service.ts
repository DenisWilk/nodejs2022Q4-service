import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private database: DatabaseService) {}

  findAll() {
    return this.database.users;
  }

  findOne(id: string) {
    const user = this.database.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('Error! User not found.');
    }

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const user = new User(
      uuidv4(),
      createUserDto.login,
      createUserDto.password,
      1,
      Date.now(),
      Date.now(),
    );

    this.database.users.push(user);

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const userIndex = this.database.users.findIndex((index) => index.id === id);

    if (userIndex === -1) {
      throw new NotFoundException('Error! User not found.');
    }

    const user = this.database.users[userIndex];

    if (updateUserDto.oldPassword !== user.password) {
      throw new ForbiddenException('Error! Wrong login or password.');
    }

    user.password = updateUserDto.newPassword;
    user.version = user.version + 1;
    user.updatedAt = Date.now();

    return user;
  }

  delete(id: string) {
    const user = this.database.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('Error! User not found.');
    }

    this.database.users = this.database.users.filter((user) => user.id !== id);
  }
}
