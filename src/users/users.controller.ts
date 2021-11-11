import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles-guard.decorator';
import { AddRoleDto } from '../roles/dto/add-role.dto';
import { ExpiredUserDto } from '../roles/dto/expired-user.dto';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {
  }

  @ApiOperation({summary: 'Создание пользователя'})
  @ApiResponse({status: 200, type: User})
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto)
  }

  @ApiOperation({summary: 'Получение списка пользователей'})
  @ApiResponse({status: 200, type: [User]})
  // @UseGuards(AuthGuard)
  @Roles("Admin")
  @UseGuards(RolesGuard)
  @Get()
  getUsers() {
    return this.usersService.getAllUsers()
  }

  @ApiOperation({summary: 'Выдача роли'})
  @ApiResponse({status: 200})
  // @UseGuards(AuthGuard)
  @Roles("Admin")
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto)
  }

  @ApiOperation({summary: 'Закрытие пользователя'})
  @ApiResponse({status: 200})
  // @UseGuards(AuthGuard)
  @Roles("Admin")
  @UseGuards(RolesGuard)
  @Post('/expired')
  expiredUser(@Body() dto: ExpiredUserDto) {
    return this.usersService.expiredUser(dto)
  }

}
