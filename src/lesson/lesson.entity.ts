import {Column, Entity, ObjectIdColumn, PrimaryColumn} from 'typeorm';

// Entity describes the object in the db

@Entity()
export class Lesson {

    @ObjectIdColumn()
    _id: string;            // MongoDB ObjectId

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;   

    @Column()
    startDate: string;

    @Column()
    endDate: string;

    @Column()
    students: string[]; // Students (ID) assigned to this lesson

}