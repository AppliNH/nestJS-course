import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";

// A repository is the layer between your app and the table

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> { }