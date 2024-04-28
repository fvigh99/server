import { IsNotEmpty } from 'class-validator';

export class CreatePassDTO {
  @IsNotEmpty({ message: 'type field cannot be empty' })
  type: string;
  @IsNotEmpty({ message: 'price field cannot be empty' })
  price: number;
  @IsNotEmpty({ message: 'entryPerWeek field cannot be empty' })
  entryPerWeek: number;
  @IsNotEmpty({ message: 'dailyEntryCount field cannot be empty' })
  dailyEntryCount: number;
  sauna?: boolean;
  kickbox?: boolean;
  spinracing?: boolean;
  pilates?: boolean;
  yoga?: boolean;
}
