import { Machine } from 'src/machine/machine.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('achievements')
export class Achievement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 50, nullable: false })
  name: string;

  @Column({ name: 'summary', length: 300, nullable: false })
  summary: string;

  @Column({ name: 'type', length: 15, nullable: false })
  type: string;

  @Column({ name: 'eventCount', type: 'int', nullable: true, default: null })
  count: number;

  @ManyToOne(() => Machine)
  @JoinColumn()
  machine: Machine;

  @Column({ name: 'weight', type: 'int', nullable: true, default: null })
  weight: number;

  @Column({
    name: 'repetitionCount',
    type: 'int',
    nullable: true,
    default: null,
  })
  repetitionCount: number;

  @Column({
    name: 'intensity',
    type: 'int',
    nullable: true,
    default: null,
  })
  intensity: number;

  @Column({
    name: 'duration',
    type: 'int',
    nullable: true,
    default: null,
  })
  duration: number;

  @Column({
    name: 'typeOfGroupTraining',
    length: 15,
    nullable: true,
  })
  typeOfGroupTraining: string;

  @Column({
    name: 'icon',
    length: 15,
    nullable: false,
  })
  icon: string;
}
