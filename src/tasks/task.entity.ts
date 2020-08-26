import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TaskStatus } from "./task.model";

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
}
