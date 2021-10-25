import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({example: 'mail@mail.ru', description: 'Почта пользователя'})
  readonly email: string;
  @ApiProperty({example: '1@Qwerty', description: 'Пароль пользователя'})
  readonly password: string
}