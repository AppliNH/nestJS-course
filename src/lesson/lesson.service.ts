import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import {v4 as uuid} from 'uuid'
import { CreateLessonInput } from './lesson.input';
import { Parent, ResolveField } from '@nestjs/graphql';
import { StudentService } from '../student/student.service';
import { Student } from 'src/student/student.entity';
import { StudentType } from 'src/student/student.type';

@Injectable()
export class LessonService {


    constructor(
        @InjectRepository(Lesson) private lessonRepo: Repository<Lesson>
        ) {}
    
    
    async getAllLessons(): Promise<Lesson[]> {
        return this.lessonRepo.find();
    }

    async getLesson(id: string): Promise<Lesson> {
        return this.lessonRepo.findOne({id});
    }

    async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
        
        const {name, startDate, endDate, students} = createLessonInput;

        const lesson = this.lessonRepo.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students
        }); 

        return this.lessonRepo.save(lesson);
    }


    async assignStudentToLesson(lessonId: string, studentIds: string[]): Promise<Lesson> {
        const lesson = await this.lessonRepo.findOne({id: lessonId});

        lesson.students = [...lesson.students, ...studentIds];

        return this.lessonRepo.save(lesson)
    }

    
}
