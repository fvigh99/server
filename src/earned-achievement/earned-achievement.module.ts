import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EarnedAchievement } from './earned-achievement.entity';
import { EarnedAchievementController } from './earned-achievement.controller';
import { EarnedAchievementService } from './earned-achievement.service';
import { Achievement } from 'src/achievement/achievement.entity';
import { AchievementService } from 'src/achievement/achievement.service';

@Module({
  imports: [TypeOrmModule.forFeature([EarnedAchievement, Achievement])],
  controllers: [EarnedAchievementController],
  providers: [EarnedAchievementService, AchievementService],
})
export class EarnedAchievementModule {}
