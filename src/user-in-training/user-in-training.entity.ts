import { Schedule } from 'src/schedule/schedule.entity';
import { User } from 'src/user/user.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity('usersInTraining')
export class UserInTraining {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => User)
  @JoinColumn()
  user: User;
  @OneToOne((type) => Schedule)
  @JoinColumn()
  schedule: Schedule;
}
