import { IsNotEmpty, IsInt } from 'class-validator';
import { Machine } from 'src/machine/machine.entity';
import { User } from 'src/user/user.entity';

export class CreateExerciseDTO {
  @IsNotEmpty({ message: 'machine field cannot be empty' })
  machine: Machine;

  @IsNotEmpty({ message: 'user field cannot be empty' })
  user: User;
  @IsInt({ message: 'weight must be number' })
  weight?: number;
  @IsInt({ message: 'count must be number' })
  count?: number;
  @IsInt({ message: 'intensity must be number' })
  intensity?: number;
  @IsInt({ message: 'duration must be number' })
  duration?: number;
}
