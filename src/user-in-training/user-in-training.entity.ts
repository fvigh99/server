import { Schedule } from 'src/schedule/schedule.entity';
import { User } from 'src/user/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity('usersInTraining')
export class UserInTraining {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User)
  @JoinColumn()
  user: User;
  @ManyToOne((type) => Schedule)
  @JoinColumn()
  schedule: Schedule;
}
