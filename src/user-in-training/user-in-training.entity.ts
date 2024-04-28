import { Schedule } from 'src/schedule/schedule.entity';
import { User } from 'src/user/user.entity';
import { Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity('usersInTraining')
export class UserInTraining {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User)
  @JoinTable()
  user: User;
  @ManyToOne((type) => Schedule)
  @JoinTable()
  schedule: Schedule;
}
