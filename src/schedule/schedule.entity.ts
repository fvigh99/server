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

  @Column({ name: 'start', nullable: false })
  start: Date;
  @Column({ name: 'end', nullable: false })
  end: Date;
  @Column({ name: 'type', length: 40, nullable: false })
  type: string;
  @Column({ name: 'capacity', type: 'int', nullable: false })
  capacity: number;
  @Column({ name: 'attendanceCount', type: 'int', nullable: false, default: 0 })
  attendanceCount: number;
  @Column({ default: false })
  inactive: boolean;
}
