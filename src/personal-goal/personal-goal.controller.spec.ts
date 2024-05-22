import { Test, TestingModule } from '@nestjs/testing';
import { PersonalGoalController } from './personal-goal.controller';

describe('PersonalGoalController', () => {
  let controller: PersonalGoalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonalGoalController],
    }).compile();

    controller = module.get<PersonalGoalController>(PersonalGoalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
