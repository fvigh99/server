import { Injectable, NotFoundException } from '@nestjs/common';
import { Exercise } from './exercise.entity';
import { Repository } from 'typeorm';
import { CreateExerciseDTO } from './dto/create-exercise.dto';
import { UpdateExerciseDTO } from './dto/update-exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exercisesRepository: Repository<Exercise>,
  ) {}

  async getExercises(): Promise<Exercise[]> {
    return this.exercisesRepository.find();
  }

  async getExerciseById(id: number): Promise<Exercise> {
    const found = await this.exercisesRepository.findOne({ where: { id: id } });
    if (!found) {
      throw new NotFoundException(`Exercise "${id}" not found`);
    }
    return found;
  }

  async addExercise(createExerciseDTO: CreateExerciseDTO): Promise<Exercise> {
    const { machine, user, weight, count, intensity, duration } =
      createExerciseDTO;
    const exercise = this.exercisesRepository.create({
      machine,
      user,
      weight,
      count,
      intensity,
      duration,
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
