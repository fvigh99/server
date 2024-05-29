import { Achievement } from 'src/achievement/achievement.entity';
import { User } from 'src/user/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('earnedAchievement')
export class EarnedAchievement {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
  @ManyToOne(() => Achievement)
  @JoinColumn()
  achievement: Achievement;
}
