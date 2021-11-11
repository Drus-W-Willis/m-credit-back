import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({example: 'Администратор', description: 'Роль'})
  readonly value: string;
  @ApiProperty({example: 'Это администратор', description: 'Описание роли'})
  readonly description: string
}