import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({example: 'Администратор', description: 'Роль, которая будет выдана пользовкателю'})
  readonly value: string;
  @ApiProperty({example: '5', description: 'ID пользователя, коотрму будет выдана роль'})
  readonly userId: number
}