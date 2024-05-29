import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EarnedAchievement } from './earned-achievement.entity';
import { Repository } from 'typeorm';
import { AchievementService } from 'src/achievement/achievement.service';
import { CreateEarnedAchievementDTO } from './dto/create-earned-achievement.dto';
import { Exercise } from 'src/exercise/exercise.entity';
import { Achievement } from 'src/achievement/achievement.entity';

@Injectable()
export class EarnedAchievementService {
  constructor(
    @InjectRepository(EarnedAchievement)
    private readonly earnedAchievementsRepository: Repository<EarnedAchievement>,
    private achievementService: AchievementService,
  ) {}

  async createEarnedAchievement(
    createEarnedAchievementDTO: CreateEarnedAchievementDTO,
  ) {
    const { user, achievement } = createEarnedAchievementDTO;
    const earnedAchievement = this.earnedAchievementsRepository.create({
      user,
      achievement,
    });
    await this.earnedAchievementsRepository.save(earnedAchievement);
    return earnedAchievement;
  }

  async getEarnedAchievementsByUserId(
    id: number,
  ): Promise<EarnedAchievement[]> {
    const found = await this.earnedAchievementsRepository.find({
      where: { user: { id: id } },
      relations: { user: true, achievement: { machine: true } },
    });

    return found;
  }

  async getEarnedAchievementsByAchievementId(
    id: number,
  ): Promise<EarnedAchievement[]> {
    const found = await this.earnedAchievementsRepository.find({
      where: { achievement: { id: id } },
      relations: { user: true, achievement: { machine: true } },
    });

    return found;
  }

  async deleteEarnedAchievement(id: number) {
    const result = await this.earnedAchievementsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`earned achievement "${id}" was not found`);
    }
    return { message: 'Earned achievement successfully deleted' };
  }

  async checkIfAchievementEarned(exercise: Exercise, exerciseList: Exercise[]) {
    const achievements = await this.achievementService.getAchievements();
    let filteredAchievements: Achievement[] = [];
    if (exercise.type === 'Egyéni') {
      filteredAchievements = achievements.filter(
        (achievement) =>
          achievement.type === 'Egyéni' &&
          achievement.machine.id === exercise.machine.id,
      );
    } else {
      filteredAchievements = achievements.filter(
        (achievement) =>
          achievement.type === 'Csoportos' &&
          achievement.typeOfGroupTraining === exercise.groupTrainingType,
      );
    }
    if (filteredAchievements.length > 0) {
      if (exercise.type === 'Egyéni') {
        filteredAchievements = filteredAchievements.filter(
          (achievement) =>
            (exercise.duration &&
              achievement.duration <= exercise.duration &&
              achievement.intensity <= exercise.intensity) ||
            (exercise.weight &&
              achievement.weight <= exercise.weight &&
              achievement.repetitionCount <= exercise.count),
        );
        if (filteredAchievements.length > 0) {
          const earnedAchievements = await this.getEarnedAchievementsByUserId(
            exercise.user.id,
          );

          earnedAchievements.forEach((earnedAchievement) => {
            filteredAchievements = filteredAchievements.filter(
              (achievement) =>
                achievement.id !== earnedAchievement.achievement.id,
            );
          });
          if (filteredAchievements.length > 0) {
            return filteredAchievements[0];
          } else {
            return null;
          }
        } else {
          return null;
        }
      } else {
        filteredAchievements = filteredAchievements.filter(
          (achievement) =>
            exercise.groupTrainingType === achievement.typeOfGroupTraining,
        );
        if (filteredAchievements.length > 0) {
          const earnedAchievements = await this.getEarnedAchievementsByUserId(
            exercise.user.id,
          );
          earnedAchievements.forEach((earnedAchievement) => {
            filteredAchievements = filteredAchievements.filter(
              (achievement) =>
                achievement.id !== earnedAchievement.achievement.id,
            );
          });
          exerciseList = exerciseList.filter(
            (exercise) =>
              exercise.groupTrainingType &&
              exercise.groupTrainingType ===
                filteredAchievements[0].typeOfGroupTraining,
          );
          if (
            filteredAchievements.length > 0 &&
            filteredAchievements[0].eventCount === exerciseList.length
          ) {
            return filteredAchievements[0];
          } else {
            return null;
          }
        } else {
          return null;
        }
      }
    } else {
      return null;
    }
  }

  async checkIfAchievementDeleted(
    exercise: Exercise,
    exerciseList: Exercise[],
  ): Promise<Achievement> {
    const earnedAchievements = await this.getEarnedAchievementsByUserId(
      exercise.user.id,
    );
    let filteredEarnedAchievements: EarnedAchievement[] = [];
    if (exercise.type === 'Egyéni') {
      filteredEarnedAchievements = earnedAchievements.filter(
        (earnedAchievement) =>
          earnedAchievement.achievement.type === 'Egyéni' &&
          exercise.machine.id === earnedAchievement.achievement.machine.id,
      );
      if (filteredEarnedAchievements.length === 0) {
        return null;
      } else {
        exerciseList = exerciseList.filter(
          (exercise) =>
            exercise.type === 'Egyéni' &&
            exercise.machine.id ===
              filteredEarnedAchievements[0].achievement.machine.id,
        );
        exerciseList = exerciseList.filter(
          (exercise) =>
            (exercise.intensity &&
              exercise.intensity >=
                filteredEarnedAchievements[0].achievement.intensity &&
              exercise.duration >=
                filteredEarnedAchievements[0].achievement.duration) ||
            (exercise.weight &&
              exercise.weight >=
                filteredEarnedAchievements[0].achievement.weight &&
              exercise.count >=
                filteredEarnedAchievements[0].achievement.repetitionCount),
        );
        if (exerciseList.length > 0) {
          return null;
        } else {
          return filteredEarnedAchievements[0].achievement;
        }
      }
    } else {
      filteredEarnedAchievements = earnedAchievements.filter(
        (earnedAchievement) =>
          earnedAchievement.achievement.type === 'Csoportos' &&
          exercise.groupTrainingType ===
            earnedAchievement.achievement.typeOfGroupTraining,
      );
      if (filteredEarnedAchievements.length === 0) {
        return null;
      } else {
        exerciseList = exerciseList.filter(
          (exercise) =>
            exercise.type === 'Csoportos' &&
            exercise.groupTrainingType ===
              filteredEarnedAchievements[0].achievement.typeOfGroupTraining,
        );
        if (
          exerciseList &&
          exerciseList.length <
            filteredEarnedAchievements[0].achievement.eventCount
        ) {
          return filteredEarnedAchievements[0].achievement;
        } else {
          return null;
        }
      }
    }
  }
}
