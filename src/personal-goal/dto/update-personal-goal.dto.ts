import { User } from 'src/user/user.entity';

export class UpdatePersonalGoalDTO {
  user: User;
  startWeight: number;
  currentWeight: number;
  goalWeight: number;
  height: number;
}
