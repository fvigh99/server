import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('passes')
export class Pass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'type', length: 20, nullable: false })
  type: string;

  @Column({ name: 'price', type: 'int', nullable: false })
  price: number;
  @Column({ name: 'entryPerWeek', type: 'int', nullable: false })
  entryPerWeek: number;
  @Column({ name: 'dailyEntryCount', type: 'int', nullable: false })
  dailyEntryCount: number;

  @Column({ default: false })
  sauna: boolean;
  @Column({ default: false })
  kickbox: boolean;
  @Column({ default: false })
  spinracing: boolean;
  @Column({ default: false })
  pilates: boolean;
  @Column({ default: false })
  yoga: boolean;
}
