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
import { PassService } from './pass.service';
import { CreatePassDTO } from './dto/create-pass.dto';
import { UpdatePassDTO } from './dto/update-pass.dto';
import { Pass } from './pass.entity';

@Controller('passes')
export class PassController {
  constructor(private passService: PassService) {}
  @Get()
  getPasss() {
    try {
      return this.passService.getPasss();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:id')
  getPassById(@Param('id') id: number): Promise<Pass> {
    try {
      return this.passService.getPassById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  createPass(
    @Body()
    createPassDTO: CreatePassDTO,
  ): Promise<Pass> {
    try {
      return this.passService.addPass(createPassDTO);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:id')
  deletePass(@Param('id') id: number) {
    try {
      return this.passService.deletePass(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/:id')
  async updatePass(@Param('id') id: number, @Body() data: UpdatePassDTO) {
    const pass = new Pass();
    Object.assign(pass, data);
    await this.passService.updatePass(id, pass);
    return { message: 'Pass successfully updated', id };
  }
}
