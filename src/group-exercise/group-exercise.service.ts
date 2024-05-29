import { Injectable, NotFoundException } from '@nestjs/common';
import { GroupExercise } from './group-exercise.entity';
import { Repository } from 'typeorm';
import { CreateGroupExerciseDTO } from './dto/create-group-exercise.dto';
import { UpdateGroupExerciseDTO } from './dto/update-group-exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GroupExerciseService {
  constructor(
    @InjectRepository(GroupExercise)
    private readonly groupExercisesRepository: Repository<GroupExercise>,
  ) {}

  async getGroupExercises(): Promise<GroupExercise[]> {
    return this.groupExercisesRepository.find({
      relations: { schedule: true, user: true },
    });
  }

  async getGroupExerciseById(id: number): Promise<GroupExercise> {
    const found = await this.groupExercisesRepository.findOne({
      where: { id: id },
      relations: { schedule: true, user: true },
    });
    if (!found) {
      throw new NotFoundException(`GroupExercise "${id}" not found`);
    }
    return found;
  }

  async addGroupExercise(
    createGroupExerciseDTO: CreateGroupExerciseDTO,
  ): Promise<GroupExercise> {
    const { type, duration, schedule, user } = createGroupExerciseDTO;
    const groupExercise = this.groupExercisesRepository.create({
      type,
      duration,
      schedule,
      user,
    });
    await this.groupExercisesRepository.save(groupExercise);
    return groupExercise;
  }

  async deleteGroupExercise(id: number) {
    const result = await this.groupExercisesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`groupExercise "${id}" was not found`);
    }
    return { message: 'GroupExercise successfully deleted' };
  }

  async updateGroupExercise(
    id: number,
    updateGroupExerciseDTO: UpdateGroupExerciseDTO,
  ) {
    const groupExerciseFound = await this.getGroupExerciseById(id);
    if (!groupExerciseFound) throw new Error(`A note "${id}" was not found`);
    Object.assign(groupExerciseFound, updateGroupExerciseDTO);
    await this.groupExercisesRepository.save(groupExerciseFound);
  }
}
