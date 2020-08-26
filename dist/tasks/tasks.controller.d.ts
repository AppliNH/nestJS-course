import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getTasks(filter: GetTaskFilterDto): Task[];
    getTaskById(id: string): Task;
    createTask(createTaskDTO: CreateTaskDTO): Task;
    updateTaskStatus(id: string, status: TaskStatus): Task;
    deleteTaskById(id: string): Task;
}
