import { Injectable, NotFoundException } from '@nestjs/common';
import { PersonalGoal } from './personal-goal.entity';
import { Repository } from 'typeorm';
import { CreatePersonalGoalDTO } from './dto/create-personal-goal.dto';
import { UpdatePersonalGoalDTO } from './dto/update-personal-goal.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PersonalGoalService {
  constructor(
    @InjectRepository(PersonalGoal)
    private readonly personalGoalsRepository: Repository<PersonalGoal>,
  ) {}

  async getPersonalGoals(): Promise<PersonalGoal[]> {
    return this.personalGoalsRepository.find({ relations: { user: true } });
  }

  async getPersonalGoalById(id: number): Promise<PersonalGoal> {
    const found = await this.personalGoalsRepository.findOne({
      where: { id: id },
      relations: { user: true },
    });
    if (!found) {
      throw new NotFoundException(`PersonalGoal "${id}" not found`);
    }

    return found;
  }
  async getPersonalGoalByUserId(id: number): Promise<PersonalGoal> {
    const found = await this.personalGoalsRepository.findOne({
      where: { user: { id: id } },
      relations: { user: true },
    });
    /* if (!found) {
      throw new NotFoundException(`PersonalGoal with user "${id}" not found`);
    } */

    return found;
  }

  async createPersonalGoal(
    createPersonalGoalDTO: CreatePersonalGoalDTO,
  ): Promise<PersonalGoal> {
    const { user, startWeight, currentWeight, goalWeight, height } =
      createPersonalGoalDTO;
    const personalGoal = this.personalGoalsRepository.create({
      user,
      startWeight,
      currentWeight,
      goalWeight,
      height,
    });
    await this.personalGoalsRepository.save(personalGoal);
    return personalGoal;
  }

  async deletePersonalGoal(id: number) {
    const result = await this.personalGoalsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`personal-goal "${id}" was not found`);
    }
    return { message: 'personal-goal successfully deleted' };
  }

  async editPersonalGoal(
    id: number,
    updatePersonalGoalDTO: UpdatePersonalGoalDTO,
  ) {
    const personalGoalFound = await this.getPersonalGoalById(id);
    if (!personalGoalFound)
      throw new Error(`A personal-goal "${id}" was not found`);
    Object.assign(personalGoalFound, updatePersonalGoalDTO);
    await this.personalGoalsRepository.save(personalGoalFound);
  }
}
