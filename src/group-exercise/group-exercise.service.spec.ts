import { Test, TestingModule } from '@nestjs/testing';
import { GroupExerciseService } from './group-exercise.service';

describe('GroupExerciseService', () => {
  let service: GroupExerciseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupExerciseService],
    }).compile();

    service = module.get<GroupExerciseService>(GroupExerciseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
