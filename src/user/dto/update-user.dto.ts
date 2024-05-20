import { IsNotEmpty } from 'class-validator';
import { Pass } from 'src/pass/pass.entity';

export class UpdateUserDTO {
  @IsNotEmpty({ message: 'username field cannot be empty' })
  username: string;

  @IsNotEmpty({ message: 'firstname field cannot be empty' })
  firstname: string;
  @IsNotEmpty({ message: 'lastname field cannot be empty' })
  lastname: string;
  @IsNotEmpty({ message: 'email field cannot be empty' })
  email: string;
  @IsNotEmpty({ message: 'role field cannot be empty' })
  role: string;
  picture?: string;
  pass?: Pass;
}
