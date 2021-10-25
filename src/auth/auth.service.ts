import { Body, HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService,
              private jwtService: JwtService) {}
  async login(userDto: CreateUserDto) {
  }


  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUser(userDto.email)
    if (candidate) {
      throw new HttpException('Пользователь существует', HttpStatus.BAD_REQUEST)
    }
    const
  }
}
