import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Machine } from 'src/machine/machine.entity';

export class CreateAchievementDTO {
  @IsNotEmpty({ message: 'name field cannot be empty' })
  name: string;
  @IsNotEmpty({ message: 'summary field cannot be empty' })
  summary: string;
  @IsNotEmpty({ message: 'type field cannot be empty' })
  type: string;
  @IsOptional()
  @IsInt({ message: 'eventCount must be of type number' })
  eventCount: number;
  machine: Machine;
  @IsOptional()
  @IsInt({ message: 'weight must be of type number' })
  weight: number;
  @IsOptional()
  @IsInt({ message: 'repetitionCount must be of type number' })
  repetitionCount: number;
  @IsOptional()
  @IsInt({ message: 'intensity must be of type number' })
  intensity: number;
  @IsOptional()
  @IsInt({ message: 'duration must be of type number' })
  duration: number;
  typeOfGroupTraining: string;
  @IsNotEmpty({ message: 'icon field cannot be empty' })
  icon: string;
}
