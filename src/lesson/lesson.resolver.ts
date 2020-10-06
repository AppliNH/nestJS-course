
import { Resolver,Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { CreateLessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";
import {AssignStudentsToLessonInput} from './assign-student.input';
import { StudentService } from "../student/student.service";
import { Lesson } from "./lesson.entity";
import { Student } from "src/student/student.entity";

// The resolver is the equivalent of the controller

@Resolver(of => LessonType)
export class LessonResolver {


    constructor(private lessonService: LessonService, private studentService: StudentService) {}

    @Query(returns => [LessonType]) // Array of LessonType => this is graphQL notation for that
    lessons() {
        return this.lessonService.getAllLessons();
    }

    @Query(returns => LessonType)
    lesson(
        @Args('id') id: string
    ){
        return this.lessonService.getLesson(id);
    }

    @Mutation(returns => LessonType)
    createLesson(
        @Args('createLessonInput') createLessonInput: CreateLessonInput
    ){

        return this.lessonService.createLesson(createLessonInput);
    }

    @Mutation(returns => LessonType)
    assignStudentsToLesson(
        @Args("assignStudentsToLessonInput") assignStudentsToLessonInput: AssignStudentsToLessonInput
    ) {

        const {lessonId, studentIds} = assignStudentsToLessonInput;
        return this.lessonService.assignStudentToLesson(lessonId, studentIds);

    }

    @ResolveField() // Resolves the field "students" when retriving lessons.
    async students(@Parent() lesson: Lesson): Promise<Student[]> {
        return this.studentService.getManyStudents(lesson.students);
    }  

}