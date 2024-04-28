import { IsNotEmpty, IsInt } from 'class-validator';
import { Schedule } from 'src/schedule/schedule.entity';
import { User } from 'src/user/user.entity';

export class UpdateGroupExerciseDTO {
  @IsNotEmpty({ message: 'type field cannot be empty' })
  type: string;

  @IsInt({ message: 'duration must be of type number' })
  duration: number;

  schedule: Schedule;
  user: User;
}
