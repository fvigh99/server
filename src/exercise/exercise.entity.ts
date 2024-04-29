import { Machine } from 'src/machine/machine.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Machine)
  @JoinTable()
  machine: Machine;

  @ManyToOne((type) => User)
  @JoinTable()
  user: User;

  @Column({ name: 'weight', type: 'int', nullable: true, default: null })
  weight: number;
  @Column({ name: 'count', type: 'int', nullable: true, default: null })
  count: number;
  @Column({ name: 'intensity', type: 'int', nullable: true, default: null })
  intensity: number;
  @Column({ name: 'duration', type: 'int', nullable: true, default: null })
  duration: number;
  @Column({ name: 'date', type: 'date', nullable: false })
  date: Date;
}
