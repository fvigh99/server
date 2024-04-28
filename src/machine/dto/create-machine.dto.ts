import { IsNotEmpty } from 'class-validator';

export class CreateMachineDTO {
  @IsNotEmpty({ message: 'type field cannot be empty' })
  type: string;

  @IsNotEmpty({ message: 'summary field cannot be empty' })
  summary: string;
  @IsNotEmpty({ message: 'picture field cannot be empty' })
  picture: string;
  @IsNotEmpty({ message: 'name field cannot be empty' })
  name: string;
}
