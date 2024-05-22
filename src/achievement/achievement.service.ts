import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Achievement } from './achievement.entity';
import { Repository } from 'typeorm';
import { CreateAchievementDTO } from './dto/create-achievement.dto';
import { UpdateAchievementDTO } from './dto/update-achievement.dto';

@Injectable()
export class AchievementService {
  constructor(
    @InjectRepository(Achievement)
    private readonly achievementsRepository: Repository<Achievement>,
  ) {}

  async getAchievements(): Promise<Achievement[]> {
    return this.achievementsRepository.find({
      relations: { machine: true },
    });
  }

  async getAchievementById(id: number): Promise<Achievement> {
    const found = await this.achievementsRepository.findOne({
      where: { id: id },
      relations: { machine: true },
    });
    if (!found) {
      throw new NotFoundException(`Achievement "${id}" not found`);
    }
    return found;
  }

  async addAchievement(
    createAchievementDTO: CreateAchievementDTO,
  ): Promise<Achievement> {
    const {
      name,
      summary,
      type,
      eventCount,
      machine,
      weight,
      repetitionCount,
      intensity,
      duration,
      typeOfGroupTraining,
      icon,
    } = createAchievementDTO;

    const achievement = this.achievementsRepository.create({
      name,
      summary,
      type,
      eventCount,
      machine,
      weight,
      repetitionCount,
      intensity,
      duration,
      typeOfGroupTraining,
      icon,
    });
    await this.achievementsRepository.save(achievement);
    return achievement;
  }

  async removeAchievement(id: number) {
    const result = await this.achievementsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`achievement "${id}" was not found`);
    }
    return { message: 'Achievement successfully deleted' };
  }

  async updateAchievement(
    id: number,
    updateAchievementDTO: UpdateAchievementDTO,
  ) {
    const achievementFound = await this.getAchievementById(id);
    if (!achievementFound) throw new Error(`A note "${id}" was not found`);
    Object.assign(achievementFound, updateAchievementDTO);
    await this.achievementsRepository.save(achievementFound);
  }
}
