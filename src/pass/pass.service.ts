import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pass } from './pass.entity';
import { Repository } from 'typeorm';
import { CreatePassDTO } from './dto/create-pass.dto';
import { UpdatePassDTO } from './dto/update-pass.dto';

@Injectable()
export class PassService {
  constructor(
    @InjectRepository(Pass)
    private readonly passsRepository: Repository<Pass>,
  ) {}

  async getPasss(): Promise<Pass[]> {
    return this.passsRepository.find();
  }

  async getPassById(id: number): Promise<Pass> {
    const found = await this.passsRepository.findOne({ where: { id: id } });
    if (!found) {
      throw new NotFoundException(`Pass "${id}" not found`);
    }
    return found;
  }

  async addPass(createPassDTO: CreatePassDTO): Promise<Pass> {
    const {
      type,
      price,
      entryPerWeek,
      dailyEntryCount,
      kickbox,
      pilates,
      sauna,
      spinracing,
      yoga,
    } = createPassDTO;
    const pass = this.passsRepository.create({
      type,
      price,
      entryPerWeek,
      dailyEntryCount,
      kickbox,
      pilates,
      sauna,
      spinracing,
      yoga,
    });
    await this.passsRepository.save(pass);
    return pass;
  }

  async deletePass(id: number) {
    const result = await this.passsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`pass "${id}" was not found`);
    }
    return { message: 'Pass successfully deleted' };
  }

  async updatePass(id: number, updatePassDTO: UpdatePassDTO) {
    const passFound = await this.getPassById(id);
    if (!passFound) throw new Error(`A note "${id}" was not found`);
    await this.passsRepository.update(id, {
      dailyEntryCount: updatePassDTO.dailyEntryCount,
      entryPerWeek: updatePassDTO.entryPerWeek,
      kickbox: updatePassDTO.kickbox,
      pilates: updatePassDTO.pilates,
      price: updatePassDTO.price,
      sauna: updatePassDTO.sauna,
      spinracing: updatePassDTO.spinracing,
      type: updatePassDTO.type,
      yoga: updatePassDTO.yoga,
    });
  }
}
