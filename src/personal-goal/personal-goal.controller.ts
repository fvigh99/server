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
import { PersonalGoalService } from './personal-goal.service';
import { PersonalGoal } from './personal-goal.entity';
import { CreatePersonalGoalDTO } from './dto/create-personal-goal.dto';
import { UpdatePersonalGoalDTO } from './dto/update-personal-goal.dto';

@Controller('personal-goals')
export class PersonalGoalController {
  constructor(private personalGoalService: PersonalGoalService) {}

  @Get()
  getPersonalGoals() {
    try {
      return this.personalGoalService.getPersonalGoals();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/getByUserId/:id')
  getPersonalGoalById(@Param('id') id: number): Promise<PersonalGoal> {
    try {
      return this.personalGoalService.getPersonalGoalByUserId(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  createPersonalGoal(
    @Body()
    createPersonalGoalDTO: CreatePersonalGoalDTO,
  ): Promise<PersonalGoal> {
    try {
      return this.personalGoalService.createPersonalGoal(createPersonalGoalDTO);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:id')
  deletePersonalGoal(@Param('id') id: number) {
    try {
      return this.personalGoalService.deletePersonalGoal(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/:id')
  async updatePersonalGoal(
    @Param('id') id: number,
    @Body() data: UpdatePersonalGoalDTO,
  ) {
    const personalGoal = new PersonalGoal();
    Object.assign(personalGoal, data);
    await this.personalGoalService.editPersonalGoal(id, personalGoal);
    return { message: 'PersonalGoal successfully updated', id };
  }
}
