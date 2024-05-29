import { Module } from '@nestjs/common';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './exercise.entity';
import { EarnedAchievement } from 'src/earned-achievement/earned-achievement.entity';
import { EarnedAchievementService } from 'src/earned-achievement/earned-achievement.service';
import { AchievementService } from 'src/achievement/achievement.service';
import { Achievement } from 'src/achievement/achievement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exercise, EarnedAchievement, Achievement]),
  ],
  controllers: [ExerciseController],
  providers: [ExerciseService, EarnedAchievementService, AchievementService],
})
export class ExerciseModule {}
