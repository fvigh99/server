import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { EarnedAchievementService } from './earned-achievement.service';
import { EarnedAchievement } from './earned-achievement.entity';
import { CreateEarnedAchievementDTO } from './dto/create-earned-achievement.dto';

@Controller('earned-achievements')
export class EarnedAchievementController {
  constructor(private earnedAchievementService: EarnedAchievementService) {}
  @Get('/userId/:id')
  getEarnedAchievementById(
    @Param('id') id: number,
  ): Promise<EarnedAchievement[]> {
    try {
      return this.earnedAchievementService.getEarnedAchievementsByUserId(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/achievementId/:id')
  getEarnedAchievementByAchievementId(
    @Param('id') id: number,
  ): Promise<EarnedAchievement[]> {
    try {
      return this.earnedAchievementService.getEarnedAchievementsByAchievementId(
        id,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  createExercise(
    @Body()
    createEarnedAchievementDTO: CreateEarnedAchievementDTO,
  ): Promise<EarnedAchievement> {
    try {
      return this.earnedAchievementService.createEarnedAchievement(
        createEarnedAchievementDTO,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:id')
  deleteExercise(@Param('id') id: number) {
    try {
      return this.earnedAchievementService.deleteEarnedAchievement(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
