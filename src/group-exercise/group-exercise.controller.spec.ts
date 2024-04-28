import { Test, TestingModule } from '@nestjs/testing';
import { GroupExerciseController } from './group-exercise.controller';

describe('GroupExerciseController', () => {
  let controller: GroupExerciseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupExerciseController],
    }).compile();

    controller = module.get<GroupExerciseController>(GroupExerciseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
