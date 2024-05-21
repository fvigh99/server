import { Schedule } from 'src/schedule/schedule.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('groupExercises')
export class GroupExercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'type', length: 40, nullable: false })
  type: string;

  @Column({ name: 'duration', type: 'int', nullable: false })
  duration: number;

  @ManyToOne(() => Schedule)
  @JoinColumn()
  schedule: Schedule;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}
