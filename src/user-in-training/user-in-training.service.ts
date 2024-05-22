import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserInTrainingDTO } from './dto/create-user-in-training.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInTraining } from './user-in-training.entity';
import { ScheduleService } from 'src/schedule/schedule.service';

@Injectable()
export class UserInTrainingService {
  constructor(
    @InjectRepository(UserInTraining)
    private readonly usersInTrainingRepository: Repository<UserInTraining>,
    private scheduleService: ScheduleService,
  ) {}

  async getUsersInTraining(): Promise<UserInTraining[]> {
    return this.usersInTrainingRepository.find({
      relations: { schedule: true, user: true },
    });
  }

  async getUserInTrainingById(id: number): Promise<UserInTraining> {
    const found = await this.usersInTrainingRepository.findOne({
      where: { id: id },
      relations: { schedule: true, user: true },
    });
    if (!found) {
      throw new NotFoundException(`UserInTraining "${id}" not found`);
    }
    return found;
  }

  async getUsersInTrainingByScheduleId(id: number): Promise<UserInTraining[]> {
    const found = await this.usersInTrainingRepository.find({
      where: { schedule: { id: id } },
      relations: { schedule: true, user: true },
    });
    if (!found) {
      throw new NotFoundException(`UserInTraining "${id}" not found`);
    }
    return found;
  }

  async getUsersInTrainingByUserId(id: number): Promise<UserInTraining[]> {
    const found = await this.usersInTrainingRepository.find({
      where: { user: { id: id } },
      relations: { schedule: true, user: true },
    });
    if (!found) {
      throw new NotFoundException(`UserInTraining "${id}" not found`);
    }
    return found;
  }
  async createUserInTraining(
    createUserInTrainingDTO: CreateUserInTrainingDTO,
  ): Promise<UserInTraining> {
    const { user, schedule } = createUserInTrainingDTO;
    const userInTraining = this.usersInTrainingRepository.create({
      user,
      schedule,
    });
    await this.usersInTrainingRepository.save(userInTraining);
    await this.scheduleService.editAttendanceCount(schedule.id, true);
    return userInTraining;
  }

  async deleteUserInTraining(id: number) {
    const found = await this.getUserInTrainingById(id);
    if (!found)
      throw new NotFoundException(`userInTraining "${id}" was not found`);
    await this.usersInTrainingRepository.delete(id);
    await this.scheduleService.editAttendanceCount(found.schedule.id, false);
    return { message: 'UserInTraining successfully deleted' };
  }
}
