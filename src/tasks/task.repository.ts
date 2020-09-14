import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTaskFilterDto } from "./dto/get-tasks-filter.dto";
import { User } from "src/auth/user.entity";

// A repository is the layer between your app and the table

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async getTasks(filterDTO: GetTaskFilterDto, user: User): Promise<Task[]> {
        const { status, search } = filterDTO;
        const query = this.createQueryBuilder('task');

        query.where("task.userId = :userId", {userId: user.id});

        if (status) {
            query.andWhere("task.status = :status", { status }) // When you simple use "where", you override any other "where".
            // So this one is good if you plan to have multiple "where"s conditions.
        }

        if (search) {
            query.andWhere("task.title LIKE :search OR task.description LIKE :search", { search: `%${search}%` })
            // % bc the result could start with, end with or simply contains the search term
        }

        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {

        // Creating a method here is better, because this layer is closer to the db than
        // the service is.
        // However, avoid doing this if the Repository already provides a method you can use in your service.
        // Example: for the GET we use the .findOne() method, which is already provider by TypeORM's Repository

        const { title, description } = createTaskDTO;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;

        await task.save();
        delete task.user; // Deletes the "user" property so it doesn't get returned in the response

        return task;

    }

}