import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: {
        pass: true,
      },
    });
  }

  async getUserById(id: number): Promise<User> {
    const found = await this.usersRepository.findOne({
      where: { id: id },
      relations: { pass: true },
    });
    /* if (!found) {
      throw new NotFoundException(`User "${id}" not found`);
    } */

    return found;
  }

  async getUserByRole(role: string): Promise<User[]> {
    const users = await this.usersRepository.find({
      where: { role: role },
      relations: {
        pass: true,
      },
    });

    return users;
  }

  async getUserByUsername(username: string): Promise<User> {
    const found = await this.usersRepository.findOne({
      where: { username: username },
      relations: { pass: true },
    });
    /* if (!found) {
      throw new NotFoundException(`User "${username}" not found`);
    } */

    return found;
  }

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const { firstname, lastname, username, email, role } = createUserDTO;
    if ((await this.getUserByUsername(createUserDTO.username)) === null) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(createUserDTO.password, salt);
      const user = this.usersRepository.create({
        firstname,
        lastname,
        username,
        password: hash,
        email,
        role,
      });
      await this.usersRepository.save(user);
      return user;
    } else {
      return null;
    }
  }

  async removeUser(id: number) {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`user "${id}" was not found`);
    }
    return { message: 'User successfully deleted' };
  }

  async updateUser(id: number, updateUserDTO: UpdateUserDTO) {
    const userFound = await this.getUserById(id);
    if (!userFound) throw new Error(`A user "${id}" was not found`);
    await this.usersRepository.update(id, {
      username: updateUserDTO.username,
      firstname: updateUserDTO.firstname,
      lastname: updateUserDTO.lastname,
      role: updateUserDTO.role,
      email: updateUserDTO.email,
      picture: updateUserDTO.picture,
      pass: updateUserDTO.pass,
      /* pass: {
        id: updateUserDTO.pass?.id,
        dailyEntryCount: updateUserDTO.pass?.dailyEntryCount,
        entryPerWeek: updateUserDTO.pass?.entryPerWeek,
        kickbox: updateUserDTO.pass?.kickbox,
        pilates: updateUserDTO.pass?.pilates,
        price: updateUserDTO.pass?.price,
        sauna: updateUserDTO.pass?.sauna,
        spinracing: updateUserDTO.pass?.spinracing,
        type: updateUserDTO.pass?.type,
        yoga: updateUserDTO.pass?.yoga,
      }, */
    });
  }
}
