import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/role.model';
import { UserRoles } from '../roles/user-roles.model';

interface UserCreationAttr {
  email: string;
  password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttr> {
  @ApiProperty({example: '1', description: 'id Уникальный идентификатор пользователя'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id:number;

  @ApiProperty({example: 'mail@mail.ru', description: 'email Почта пользователя'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @ApiProperty({example: '1@Qwerty', description: 'Пароль пользователя'})
  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[]
}