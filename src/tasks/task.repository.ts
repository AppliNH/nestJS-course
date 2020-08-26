import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";

// A repository is the layer between your app and the table

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> { 

    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        
        // Creating a method here is better, because this layer is closer to the db than
        // the service is.
        // However, avoid doing this if the Repository already provides a method you can use in your service.
        // Example: for the GET we use the .findOne() method, which is already provider by TypeORM's Repository

        const {title, description} = createTaskDTO;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;

        await task.save()

        return task;

    }

}