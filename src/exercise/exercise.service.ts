import { Injectable, NotFoundException } from '@nestjs/common';
import { Exercise } from './exercise.entity';
import { Repository } from 'typeorm';
import { CreateExerciseDTO } from './dto/create-exercise.dto';
import { UpdateExerciseDTO } from './dto/update-exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exercisesRepository: Repository<Exercise>,
  ) {}

  async getExercises(): Promise<Exercise[]> {
    return await this.exercisesRepository.find({
      relations: { machine: true, user: true },
    });
  }

  async getExerciseById(id: number): Promise<Exercise> {
    const found = await this.exercisesRepository.findOne({
      where: { id: id },
      relations: { machine: true, user: true },
    });
    if (!found) {
      throw new NotFoundException(`Exercise "${id}" not found`);
    }
    return found;
  }

  async getExerciseByUserId(id: number): Promise<Exercise> {
    const found = await this.exercisesRepository.findOne({
      where: { user: { id: id } },
      relations: { machine: true, user: true },
    });
    if (!found) {
      throw new NotFoundException(`Exercise from user "${id}" not found`);
    }
    return found;
  }

  async addExercise(createExerciseDTO: CreateExerciseDTO): Promise<Exercise> {
    log(createExerciseDTO);
    const { machine, user, weight, count, intensity, duration, date } =
      createExerciseDTO;
    const exercise = this.exercisesRepository.create({
      machine,
      user,
      weight,
      count,
      intensity,
      duration,
      date,
    });
    await this.exercisesRepository.save(exercise);
    return exercise;
  }

  async removeExercise(id: number) {
    const result = await this.exercisesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`exercise "${id}" was not found`);
    }
    return { message: 'Exercise successfully deleted' };
  }

  async updateExercise(id: number, updateExerciseDTO: UpdateExerciseDTO) {
    const exerciseFound = await this.getExerciseById(id);
    if (!exerciseFound) throw new Error(`A note "${id}" was not found`);
    await this.exercisesRepository.update(id, updateExerciseDTO);
  }
}
