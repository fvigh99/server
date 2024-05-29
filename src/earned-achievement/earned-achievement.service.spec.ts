import { Test, TestingModule } from '@nestjs/testing';
import { EarnedAchievementService } from './earned-achievement.service';

describe('EarnedAchievementService', () => {
  let service: EarnedAchievementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EarnedAchievementService],
    }).compile();

    service = module.get<EarnedAchievementService>(EarnedAchievementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
