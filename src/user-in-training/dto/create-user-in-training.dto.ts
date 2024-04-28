import { IsNotEmpty } from 'class-validator';
import { Schedule } from 'src/schedule/schedule.entity';
import { User } from 'src/user/user.entity';

export class CreateUserInTrainingDTO {
  @IsNotEmpty({ message: 'user field cannot be empty' })
  user: User;

  @IsNotEmpty({ message: 'schedule field cannot be empty' })
  schedule: Schedule;
}
