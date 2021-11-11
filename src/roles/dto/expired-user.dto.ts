import { ApiProperty } from '@nestjs/swagger';

export class ExpiredUserDto {
  @ApiProperty({example: '5', description: 'ID поьзователя, которого нужно заблокировать'})
  readonly userId: number;
  @ApiProperty({example: 'Уволен', description: 'Причина блокировки'})
  readonly reason: string
}