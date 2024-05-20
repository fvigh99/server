import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  trainer: User;

  @Column({ name: 'day', type: 'int', nullable: false })
  day: number;

  @Column({ name: 'start', length: 10, nullable: false })
  start: string;
  @Column({ name: 'end', length: 10, nullable: false })
  end: string;
  @Column({ name: 'type', length: 40, nullable: false })
  type: string;
  @Column({ name: 'capacity', type: 'int', nullable: false })
  capacity: number;
  @Column()
  inactive: boolean;
}
