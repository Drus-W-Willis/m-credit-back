import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private repositoryUser: typeof User,
              private rolesService: RolesService) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.repositoryUser.create(dto)
    const role = await this.rolesService.getRoleByValue('Admin')
    await user.$set('roles', [role.id])
    return user
  }

  async getAllUsers() {
    const users = await this.repositoryUser.findAll({include: {all: true }})
    return users
  }

  async getUser(email: string) {
    const user = await this.repositoryUser.findOne({where: {email}, include: {all: true}})
    return user
  }

}
