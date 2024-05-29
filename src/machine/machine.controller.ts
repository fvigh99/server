import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MachineService } from './machine.service';
import { CreateMachineDTO } from './dto/create-machine.dto';
import { UpdateMachineDTO } from './dto/update-machine.dto';
import { Machine } from './machine.entity';

@Controller('machines')
export class MachineController {
  constructor(private machineService: MachineService) {}
  @Get('/flag/:flag')
  getMachines(@Param('flag') flag: string) {
    try {
      return this.machineService.getMachines(flag);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:id')
  getMachineById(@Param('id') id: number): Promise<Machine> {
    try {
      return this.machineService.getMachineById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  createMachine(
    @Body()
    createMachineDTO: CreateMachineDTO,
  ): Promise<Machine> {
    try {
      return this.machineService.addMachine(createMachineDTO);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:id')
  deleteMachine(@Param('id') id: number) {
    try {
      return this.machineService.deleteMachine(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/:id')
  async updateMachine(@Param('id') id: number, @Body() data: UpdateMachineDTO) {
    const machine = new Machine();
    Object.assign(machine, data);
    await this.machineService.updateMachine(id, machine);
    return { message: 'Machine successfully updated', id };
  }
}
