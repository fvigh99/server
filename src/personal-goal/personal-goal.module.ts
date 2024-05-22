import { Module } from '@nestjs/common';
import { PersonalGoalService } from './personal-goal.service';
import { PersonalGoalController } from './personal-goal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalGoal } from './personal-goal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalGoal])],
  providers: [PersonalGoalService],
  controllers: [PersonalGoalController],
})
export class PersonalGoalModule {}
