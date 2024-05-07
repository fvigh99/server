import { Pass } from 'src/pass/pass.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'username', length: 20, nullable: false })
  username: string;

  @Column({ name: 'firstname', length: 15, nullable: false })
  firstname: string;

  @Column({ name: 'lastname', length: 15, nullable: false })
  lastname: string;

  @Column({ name: 'password', length: 200, nullable: false })
  password: string;

  @Column({ name: 'email', length: 150, nullable: false })
  email: string;

  @Column({ name: 'role', length: 10, nullable: false })
  role: string;
  @Column({ name: 'picture', length: 400, nullable: true })
  picture: string;

  @ManyToOne((type) => Pass)
  @JoinColumn()
  pass: Pass;

  @CreateDateColumn()
  crd: Date;
}
