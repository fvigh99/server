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
import { ScheduleService } from './schedule.service';
import { Schedule } from './schedule.entity';
import { CreateScheduleDTO } from './dto/create-schedule.dto';
import { UpdateScheduleDTO } from './dto/update-schedule.dto';

@Controller('schedules')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Get()
  getSchedules() {
    try {
      return this.scheduleService.getSchedules();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/getByTrainerId/:id')
  getScheduleById(@Param('id') id: number): Promise<Schedule[]> {
    try {
      return this.scheduleService.getScheduleByTrainerId(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  createSchedule(
    @Body()
    createScheduleDTO: CreateScheduleDTO,
  ): Promise<Schedule> {
    try {
      return this.scheduleService.createSchedule(createScheduleDTO);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:id')
  deleteSchedule(@Param('id') id: number) {
    try {
      return this.scheduleService.deleteSchedule(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/:id')
  async updateSchedule(
    @Param('id') id: number,
    @Body() data: UpdateScheduleDTO,
  ) {
    const schedule = new Schedule();
    Object.assign(schedule, data);
    await this.scheduleService.editSchedule(id, schedule);
    return { message: 'Schedule successfully updated', id };
  }
}
