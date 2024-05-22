import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { Achievement } from './achievement.entity';
import { CreateAchievementDTO } from './dto/create-achievement.dto';
import { UpdateAchievementDTO } from './dto/update-achievement.dto';

@Controller('achievements')
export class AchievementController {
  constructor(private achievementService: AchievementService) {}

  @Get()
  getAchievements() {
    try {
      return this.achievementService.getAchievements();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:id')
  getAchievementById(@Param('id') id: number): Promise<Achievement> {
    try {
      return this.achievementService.getAchievementById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  createAchievement(
    @Body()
    createAchievementDTO: CreateAchievementDTO,
  ): Promise<Achievement> {
    try {
      return this.achievementService.addAchievement(createAchievementDTO);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:id')
  deleteAchievement(@Param('id') id: number) {
    try {
      return this.achievementService.removeAchievement(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/:id')
  async updateAchievement(
    @Param('id') id: number,
    @Body() data: UpdateAchievementDTO,
  ) {
    const achievement = new Achievement();
    Object.assign(achievement, data);
    await this.achievementService.updateAchievement(id, achievement);
    return { message: 'Achievement successfully updated', id };
  }
}
