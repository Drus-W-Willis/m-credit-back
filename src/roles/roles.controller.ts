import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './role.model';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({summary: 'Добавление нововй роли'})
  @ApiResponse({status: 200, type: Role})
  @Post("/create")
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto)
  }

  @ApiOperation({summary: 'Выбор роли по id'})
  @ApiResponse({status: 200, type: Role})
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value)
  }
}
