import { Test, TestingModule } from '@nestjs/testing';
import { EarnedAchievementController } from './earned-achievement.controller';

describe('EarnedAchievementController', () => {
  let controller: EarnedAchievementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EarnedAchievementController],
    }).compile();

    controller = module.get<EarnedAchievementController>(
      EarnedAchievementController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
