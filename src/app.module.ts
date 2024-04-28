import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ExerciseModule } from './exercise/exercise.module';
import { ScheduleModule } from './schedule/schedule.module';
import { UserInTrainingModule } from './user-in-training/user-in-training.module';
import { MachineModule } from './machine/machine.module';
import { GroupExerciseModule } from './group-exercise/group-exercise.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { PassModule } from './pass/pass.module';
import { Pass } from './pass/pass.entity';
import { UserInTraining } from './user-in-training/user-in-training.entity';
import { Schedule } from './schedule/schedule.entity';
import { Machine } from './machine/machine.entity';
import { GroupExercise } from './group-exercise/group-exercise.entity';
import { Exercise } from './exercise/exercise.entity';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'login',
      password: 'str',
      database: 'mdp73y',
      options: {
        encrypt: false,
      },
      synchronize: true,
      entities: [
        User,
        Pass,
        UserInTraining,
        Schedule,
        Machine,
        GroupExercise,
        Exercise,
      ],
    }),
    UserModule,
    ExerciseModule,
    ScheduleModule,
    UserInTrainingModule,
    MachineModule,
    GroupExerciseModule,
    GroupExerciseModule,
    PassModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
