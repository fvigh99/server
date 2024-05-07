import { Schedule } from 'src/schedule/schedule.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('groupExercises')
export class GroupExercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'type', length: 20, nullable: false })
  type: string;

  @Column({ name: 'duration', type: 'int', nullable: false })
  duration: number;

  @OneToOne((type) => Schedule)
  @JoinColumn()
  schedule: Schedule;

  @OneToOne((type) => User)
  @JoinColumn()
  user: User;
}
