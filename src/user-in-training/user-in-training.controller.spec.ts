import { Test, TestingModule } from '@nestjs/testing';
import { UserInTrainingController } from './user-in-training.controller';

describe('UserInTrainingController', () => {
  let controller: UserInTrainingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserInTrainingController],
    }).compile();

    controller = module.get<UserInTrainingController>(UserInTrainingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
