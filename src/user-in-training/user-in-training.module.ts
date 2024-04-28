import { Module } from '@nestjs/common';
import { UserInTrainingController } from './user-in-training.controller';
import { UserInTrainingService } from './user-in-training.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInTraining } from './user-in-training.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserInTraining])],
  controllers: [UserInTrainingController],
  providers: [UserInTrainingService],
})
export class UserInTrainingModule {}
