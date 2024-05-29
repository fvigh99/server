import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('personalGoal')
export class PersonalGoal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
  @Column({ name: 'startWeight', type: 'int', nullable: false })
  startWeight: number;
  @Column({ name: 'currentWeight', type: 'int', nullable: false })
  currentWeight: number;
  @Column({ name: 'goalWeight', type: 'int', nullable: false })
  goalWeight: number;
  @Column({ name: 'height', type: 'int', nullable: false })
  height: number;
}
