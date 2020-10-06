import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonModule } from './lesson/lesson.module';
import { LessonResolver } from './lesson/lesson.resolver';
import {Lesson} from './lesson/lesson.entity';
import { StudentModule } from './student/student.module';
import {Student} from './student/student.entity';
import {StudentResolver} from './student/student.resolver';


@Module({
  imports: [
    LessonModule,

    TypeOrmModule.forRoot({
      type: 'mongodb',
      url:'mongodb://localhost/school', // School database
      synchronize: true,
      useUnifiedTopology: true,
      entities: [
        Lesson,
        Student
      ]
    }),

    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),

    StudentModule,
    
  ],
  providers:[LessonResolver, StudentResolver]
})
export class AppModule {}
