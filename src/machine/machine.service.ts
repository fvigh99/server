import { Injectable, NotFoundException } from '@nestjs/common';
import { Machine } from './machine.entity';
import { Repository } from 'typeorm';
import { CreateMachineDTO } from './dto/create-machine.dto';
import { UpdateMachineDTO } from './dto/update-machine.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MachineService {
  constructor(
    @InjectRepository(Machine)
    private readonly machinesRepository: Repository<Machine>,
  ) {}

  async getMachines(): Promise<Machine[]> {
    return this.machinesRepository.find();
  }

  async getMachineById(id: number): Promise<Machine> {
    const found = await this.machinesRepository.findOne({ where: { id: id } });
    if (!found) {
      throw new NotFoundException(`Machine "${id}" not found`);
    }
    return found;
  }

  async addMachine(createMachineDTO: CreateMachineDTO): Promise<Machine> {
    const { type, name, picture, summary } = createMachineDTO;
    const machine = this.machinesRepository.create({
      type,
      name,
      picture,
      summary,
    });
    await this.machinesRepository.save(machine);
    return machine;
  }

  async removeMachine(id: number) {
    const result = await this.machinesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`machine "${id}" was not found`);
    }
    return { message: 'Machine successfully deleted' };
  }

  async updateMachine(id: number, updateMachineDTO: UpdateMachineDTO) {
    const machineFound = await this.getMachineById(id);
    if (!machineFound) throw new Error(`A note "${id}" was not found`);
    await this.machinesRepository.update(id, updateMachineDTO);
  }
}
