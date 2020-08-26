import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
export declare class TasksService {
    private tasks;
    getAllTasks(): Task[];
    getTaskById(id: string): Task;
    getTasksWithFilter(filter: GetTaskFilterDto): Task[];
    createTask(createTaskDTO: CreateTaskDTO): Task;
    updateTaskStatus(id: string, status: TaskStatus): Task;
    deleteTaskById(id: string): Task;
}
