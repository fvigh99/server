import { Module } from '@nestjs/common';
import { PassController } from './pass.controller';
import { PassService } from './pass.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pass } from './pass.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pass])],
  controllers: [PassController],
  providers: [PassService],
})
export class PassModule {}
