import { Schedule } from 'src/schedule/schedule.entity';
import { User } from 'src/user/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity('usersInTraining')
export class UserInTraining {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
  @ManyToOne(() => Schedule)
  @JoinColumn()
  schedule: Schedule;
}
