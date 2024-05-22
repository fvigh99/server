import { Test, TestingModule } from '@nestjs/testing';
import { PersonalGoalService } from './personal-goal.service';

describe('PersonalGoalService', () => {
  let service: PersonalGoalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalGoalService],
    }).compile();

    service = module.get<PersonalGoalService>(PersonalGoalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
