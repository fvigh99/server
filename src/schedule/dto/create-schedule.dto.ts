import { IsNotEmpty } from 'class-validator';
import { Schedule } from 'src/schedule/schedule.entity';

export class CreateScheduleDTO {
  @IsNotEmpty({ message: 'trainer field cannot be empty' })
  trainer: Schedule;

  @IsNotEmpty({ message: 'day field cannot be empty' })
  day: number;
  @IsNotEmpty({ message: 'start field cannot be empty' })
  start: string;
  @IsNotEmpty({ message: 'end field cannot be empty' })
  end: string;
  @IsNotEmpty({ message: 'type field cannot be empty' })
  type: string;
  @IsNotEmpty({ message: 'capacity field cannot be empty' })
  capacity: number;
  inactive?: boolean;
}
