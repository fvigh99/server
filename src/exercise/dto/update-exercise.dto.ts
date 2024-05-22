import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Machine } from 'src/machine/machine.entity';
import { User } from 'src/user/user.entity';

export class UpdateExerciseDTO {
  @IsOptional()
  machine: Machine;

  @IsNotEmpty({ message: 'user field cannot be empty' })
  user: User;
  @IsNotEmpty({ message: 'type field cannot be empty' })
  type: string;
  @IsOptional()
  groupTrainingType: string;
  @IsInt({ message: 'weight must be number' })
  @IsOptional()
  weight?: number;
  @IsInt({ message: 'count must be number' })
  @IsOptional()
  count?: number;
  @IsInt({ message: 'intensity must be number' })
  @IsOptional()
  intensity?: number;
  @IsInt({ message: 'duration must be number' })
  @IsOptional()
  duration?: number;
  @IsNotEmpty({ message: 'date field cannot be empty' })
  date?: Date;
}
