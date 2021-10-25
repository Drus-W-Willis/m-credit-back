import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { UserRoles } from './user-roles.model';

interface RoleCreationAttr {
  value: string
  description: string
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttr> {
  @ApiProperty({example: 'Manager', description: 'Значение роли пользователя'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  value: string;

  @ApiProperty({example: 'Супервайзер', description: 'Описание роли пользователя'})
  @Column({type: DataType.STRING, allowNull: false})
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[]
}