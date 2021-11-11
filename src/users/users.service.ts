import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from '../roles/dto/add-role.dto';
import { ExpiredUserDto } from '../roles/dto/expired-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private repositoryUser: typeof User,
              private rolesService: RolesService) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.repositoryUser.create(dto)
    const role = await this.rolesService.getRoleByValue('Admin')
    await user.$set('roles', [role.id])
    user.roles = [role]
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

  async addRole(dto: AddRoleDto) {
    const user = await this.repositoryUser.findByPk(dto.userId)
    const role = await this.rolesService.getRoleByValue(dto.value)
    if (role && user) {
      await user.$add('role', role.id)
      return dto
    }
    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
  }

  async expiredUser(dto: ExpiredUserDto) {
    const user = await this.repositoryUser.findByPk(dto.userId)
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
    }
    user.expired = true;
    user.expiredReason = dto.reason
    await user.save()
    return user
  }
}
