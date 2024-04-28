import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('machines')
export class Machine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'type', length: 20, nullable: false })
  type: string;

  @Column({ name: 'summary', length: 200, nullable: false })
  summary: string;
  @Column({ name: 'picture', length: 200, nullable: false })
  picture: string;
  @Column({ name: 'name', length: 60, nullable: false })
  name: string;
}
