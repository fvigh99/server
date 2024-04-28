import { Injectable, NotFoundException } from '@nestjs/common';
import { Schedule } from './schedule.entity';
import { Repository } from 'typeorm';
import { CreateScheduleDTO } from './dto/create-schedule.dto';
import { UpdateScheduleDTO } from './dto/update-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly schedulesRepository: Repository<Schedule>,
  ) {}

  async getSchedules(): Promise<Schedule[]> {
    return this.schedulesRepository.find();
  }

  async getScheduleById(id: number): Promise<Schedule> {
    const found = await this.schedulesRepository.findOne({
      where: { trainer: { id: id } },
    });
    /* if (!found) {
      throw new NotFoundException(`Schedule with trainer "${id}" not found`);
    } */
    return found;
  }

  async createSchedule(
    createScheduleDTO: CreateScheduleDTO,
  ): Promise<Schedule> {
    const { trainer, day, start, end, type, capacity, inactive } =
      createScheduleDTO;
    const schedule = this.schedulesRepository.create({
      trainer,
      day,
      start,
      end,
      type,
      capacity,
      inactive,
    });
    await this.schedulesRepository.save(schedule);
    return schedule;
  }

  async deleteSchedule(id: number) {
    const result = await this.schedulesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`schedule "${id}" was not found`);
    }
    return { message: 'schedule successfully deleted' };
  }

  async editSchedule(id: number, updateScheduleDTO: UpdateScheduleDTO) {
    const scheduleFound = await this.getScheduleById(id);
    if (!scheduleFound) throw new Error(`A schedule "${id}" was not found`);
    await this.schedulesRepository.update(id, {
      capacity: updateScheduleDTO.capacity,
      day: updateScheduleDTO.day,
      start: updateScheduleDTO.start,
      end: updateScheduleDTO.end,
      trainer: updateScheduleDTO.trainer,
      type: updateScheduleDTO.type,
      inactive: updateScheduleDTO.inactive,
    });
  }
}
