import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private repositoryUser: typeof User) {
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.repositoryUser.create(dto)
    return user
  }

  async getAllUsers() {
    const users = await this.repositoryUser.findAll()
    return users
  }

  async getUser() {}

}
