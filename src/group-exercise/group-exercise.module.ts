import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupExercise } from './group-exercise.entity';
import { GroupExerciseController } from './group-exercise.controller';
import { GroupExerciseService } from './group-exercise.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupExercise])],
  controllers: [GroupExerciseController],
  providers: [GroupExerciseService],
})
export class GroupExerciseModule {}
