import { User } from "../auth/user.entity";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TaskStatus } from "./task-status.enum";


// Task entity in the db

@Entity()
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn() // Tells that ID should be automatically generated and incremented when creating a task
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @ManyToOne(type => User, user => user.tasks, { eager: false }) // There could be many tasks for one user.
    user: User;         // Only one side of the relationship can have eager=true, not both sides.

    @Column()
    userId: number; // Needs to be here as it figures in the db schema for tasks
    // The userId column in Postgres had been created for us, because we previously set up a relationship
}
