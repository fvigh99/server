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
import { ExerciseService } from './exercise.service';
import { CreateExerciseDTO } from './dto/create-exercise.dto';
import { UpdateExerciseDTO } from './dto/update-exercise.dto';
import { Exercise } from './exercise.entity';

@Controller('exercises')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}
  @Get()
  getExercises() {
    try {
      return this.exerciseService.getExercises();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/getId/:id')
  getExerciseById(@Param('id') id: number): Promise<Exercise> {
    try {
      return this.exerciseService.getExerciseById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/userId/:id')
  getExerciseByUserId(@Param('id') id: number): Promise<Exercise[]> {
    try {
      return this.exerciseService.getExerciseByUserId(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  createExercise(
    @Body()
    createExerciseDTO: CreateExerciseDTO,
  ): Promise<Exercise> {
    try {
      return this.exerciseService.addExercise(createExerciseDTO);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:id')
  deleteExercise(@Param('id') id: number) {
    try {
      return this.exerciseService.removeExercise(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/:id')
  async updateExercise(
    @Param('id') id: number,
    @Body() data: UpdateExerciseDTO,
  ) {
    const exercise = new Exercise();
    Object.assign(exercise, data);
    await this.exerciseService.updateExercise(id, exercise);
    return { message: 'Exercise successfully updated', id };
  }
}
