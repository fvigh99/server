import { Module } from '@nestjs/common';
import { UserInTrainingController } from './user-in-training.controller';
import { UserInTrainingService } from './user-in-training.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInTraining } from './user-in-training.entity';
import { ScheduleService } from 'src/schedule/schedule.service';
import { ScheduleController } from 'src/schedule/schedule.controller';
import { Schedule } from 'src/schedule/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserInTraining, Schedule])],
  controllers: [UserInTrainingController, ScheduleController],
  providers: [UserInTrainingService, ScheduleService],
})
export class UserInTrainingModule {}
