import { Test, TestingModule } from '@nestjs/testing';
import { UserInTrainingService } from './user-in-training.service';

describe('UserInTrainingService', () => {
  let service: UserInTrainingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserInTrainingService],
    }).compile();

    service = module.get<UserInTrainingService>(UserInTrainingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
