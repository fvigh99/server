import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers() {
    try {
      return this.userService.getUsers();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/getId/:id')
  getUserById(@Param('id') id: number): Promise<User> {
    try {
      return this.userService.getUserById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/getRole')
  getUsersByRole(): Promise<User[]> {
    try {
      return this.userService.getUserByRole('EDZO');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  createUser(
    @Body()
    createUserDTO: CreateUserDTO,
  ): Promise<User> {
    try {
      return this.userService.addUser(createUserDTO);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    try {
      return this.userService.removeUser(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/:id')
  async updateUser(@Param('id') id: number, @Body() data: UpdateUserDTO) {
    const user = new User();
    Object.assign(user, data);
    await this.userService.updateUser(id, user);
    return { message: 'User successfully updated', id };
  }
}
