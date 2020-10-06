import {Column, Entity, ObjectIdColumn, PrimaryColumn} from 'typeorm';

@Entity()
export class Student {

    @ObjectIdColumn()
    _id: string;            // MongoDB ObjectId

    @PrimaryColumn()
    id: string;

    @Column()
    firstName: string;   

    @Column()
    lastName: string;   

}