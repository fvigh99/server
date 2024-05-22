import { IsInt, IsNotEmpty } from 'class-validator';
import { User } from 'src/user/user.entity';

export class CreateScheduleDTO {
  @IsNotEmpty({ message: 'trainer field cannot be empty' })
  trainer: User;

  @IsNotEmpty({ message: 'day field cannot be empty' })
  day: number;
  @IsNotEmpty({ message: 'start field cannot be empty' })
  start: Date;
  @IsNotEmpty({ message: 'end field cannot be empty' })
  end: Date;
  @IsNotEmpty({ message: 'type field cannot be empty' })
  type: string;
  @IsNotEmpty({ message: 'capacity field cannot be empty' })
  @IsInt({ message: 'capacity field must be number' })
  capacity: number;
  attendanceCount: number;
  inactive?: boolean;
}
