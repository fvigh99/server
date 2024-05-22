import { User } from 'src/user/user.entity';

export class CreatePersonalGoalDTO {
  user: User;
  startWeight: number;
  currentWeight: number;
  goalWeight: number;
  height: number;
}
