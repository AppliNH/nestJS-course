import {InputType, Field, ID} from '@nestjs/graphql';
import { IsUUID } from 'class-validator';


@InputType()
export class AssignStudentsToLessonInput {

    @IsUUID()
    @Field(type => ID)
    lessonId: string;


    @IsUUID("all", {each: true}) // "all" => accepts all versions of uuid. // each => array of uuid
    @Field(type => [ID])
    studentIds: string[];
}