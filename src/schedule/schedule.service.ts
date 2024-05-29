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
    /* private userInTrainingService: UserInTrainingService, */
  ) {}

  async getSchedules(): Promise<Schedule[]> {
    return this.schedulesRepository.find({ relations: { trainer: true } });
  }

  async getScheduleById(id: number): Promise<Schedule> {
    const found = await this.schedulesRepository.findOne({
      where: { id: id },
      relations: { trainer: true },
    });
    if (!found) {
      throw new NotFoundException(`Schedule "${id}" not found`);
    }

    return found;
  }
  async getScheduleByTrainerId(id: number): Promise<Schedule[]> {
    const found = await this.schedulesRepository.find({
      where: { trainer: { id: id } },
      relations: { trainer: true },
      order: {
        start: 'ASC',
      },
    });
    if (!found) {
      throw new NotFoundException(`Schedule with trainer "${id}" not found`);
    }

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
    /* this.userInTrainingService.deleteUserInTrainingByScheduleId(id); */
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

  async editAttendanceCount(scheduleId: number, attend: boolean) {
    const scheduleFound = await this.getScheduleById(scheduleId);
    if (!scheduleFound)
      throw new Error(`A schedule "${scheduleId}" was not found`);
    if (attend) {
      scheduleFound.attendanceCount++;
    } else {
      scheduleFound.attendanceCount--;
    }
    return await this.schedulesRepository.save(scheduleFound);
  }
}
