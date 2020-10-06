import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import {v4 as uuid} from "uuid";
import {CreateStudentInput} from "./student.input";

@Injectable()
export class StudentService {

    constructor(

        @InjectRepository(Student) private studentRepo: Repository<Student>

    ) {}

    async getAllStudents(): Promise<Student[]> {
        return this.studentRepo.find();
    }

    async getStudentById(id: string): Promise<Student> {
        return this.studentRepo.findOne({id});
    }  

    async createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
        const {firstName, lastName} = createStudentInput;

        const student = this.studentRepo.create({id:uuid(),firstName, lastName});
        return this.studentRepo.save(student);
    }

    async getManyStudents(studentIds: string[]): Promise<Student[]> {
        return this.studentRepo.find({
            where: {
                id: {
                    $in: studentIds,
                }
            }
        });
    }

}
