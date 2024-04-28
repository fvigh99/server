import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UserInTrainingService } from './user-in-training.service';
import { UserInTraining } from './user-in-training.entity';
import { CreateUserInTrainingDTO } from './dto/create-user-in-training.dto';

@Controller('users-in-training')
export class UserInTrainingController {
  constructor(private userInTrainingService: UserInTrainingService) {}
  @Get()
  getUsersInTraining() {
    try {
      return this.userInTrainingService.getUsersInTraining();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:id')
  getUserInTrainingById(@Param('id') id: number): Promise<UserInTraining> {
    try {
      return this.userInTrainingService.getUserInTrainingById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Get('/schedule/:id')
  getUserInTrainingByScheduleId(
    @Param('id') id: number,
  ): Promise<UserInTraining> {
    try {
      return this.userInTrainingService.getUsersInTrainingByScheduleId(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  createUser(
    @Body()
    createUserDTO: CreateUserInTrainingDTO,
  ): Promise<UserInTraining> {
    try {
      return this.userInTrainingService.createUserInTraining(createUserDTO);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    try {
      return this.userInTrainingService.deleteUserInTraining(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
