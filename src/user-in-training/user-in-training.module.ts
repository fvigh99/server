import { Module } from '@nestjs/common';
import { UserInTrainingController } from './user-in-training.controller';
import { UserInTrainingService } from './user-in-training.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInTraining } from './user-in-training.entity';
import { ScheduleService } from 'src/schedule/schedule.service';
import { Schedule } from 'src/schedule/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserInTraining, Schedule])],
  controllers: [UserInTrainingController],
  providers: [UserInTrainingService, ScheduleService],
  exports: [UserInTrainingService],
})
export class UserInTrainingModule {}
