import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from 'src/student/student.module';
import { Lesson } from './lesson.entity';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';

@Module({
  imports: [
    StudentModule,
    TypeOrmModule.forFeature([Lesson]) // Always .forFeature if you add this in sub-modules of the application
  ],
  providers: [
    LessonResolver,
    LessonService
  ],
  exports:[LessonService] // else: nestjs can't resolve dependencies of the service
})
export class LessonModule {}
