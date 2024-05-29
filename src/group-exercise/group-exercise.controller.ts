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
import { GroupExerciseService } from './group-exercise.service';
import { GroupExercise } from './group-exercise.entity';
import { CreateGroupExerciseDTO } from './dto/create-group-exercise.dto';
import { UpdateGroupExerciseDTO } from './dto/update-group-exercise.dto';

@Controller('groupExercises')
export class GroupExerciseController {
  constructor(private groupExerciseService: GroupExerciseService) {}
  @Get()
  getGroupExercises() {
    try {
      return this.groupExerciseService.getGroupExercises();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:id')
  getGroupExerciseById(@Param('id') id: number): Promise<GroupExercise> {
    try {
      return this.groupExerciseService.getGroupExerciseById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  createGroupExercise(
    @Body()
    createGroupExerciseDTO: CreateGroupExerciseDTO,
  ): Promise<GroupExercise> {
    try {
      return this.groupExerciseService.addGroupExercise(createGroupExerciseDTO);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:id')
  deleteGroupExercise(@Param('id') id: number) {
    try {
      return this.groupExerciseService.deleteGroupExercise(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/:id')
  async updateGroupExercise(
    @Param('id') id: number,
    @Body() data: UpdateGroupExerciseDTO,
  ) {
    const groupExercise = new GroupExercise();
    Object.assign(groupExercise, data);
    await this.groupExerciseService.updateGroupExercise(id, groupExercise);
    return { message: 'GroupExercise successfully updated', id };
  }
}
