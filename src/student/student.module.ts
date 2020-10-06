import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';

@Module({

  imports: [
    TypeOrmModule.forFeature([Student]) // Always .forFeature if you add this in sub-modules of the application
  ],

  providers: [StudentResolver,StudentService],
  exports: [StudentService]
})
export class StudentModule {}
