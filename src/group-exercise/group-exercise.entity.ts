import { Schedule } from 'src/schedule/schedule.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
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

  @ManyToOne((type) => Schedule)
  @JoinTable()
  schedule: Schedule;

  @ManyToOne((type) => User)
  @JoinTable()
  user: User;
}
