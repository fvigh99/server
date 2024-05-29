import { IsNotEmpty } from 'class-validator';
import { Achievement } from 'src/achievement/achievement.entity';
import { User } from 'src/user/user.entity';

export class CreateEarnedAchievementDTO {
  @IsNotEmpty({ message: 'user cannot be empty' })
  user: User;
  @IsNotEmpty({ message: 'achievement cannot be empty' })
  achievement: Achievement;
}
