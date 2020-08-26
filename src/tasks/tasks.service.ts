import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find((task) => task.id == id);
    }

    getTasksWithFilter(filter: GetTaskFilterDto): Task[] {
        const {status, search} = filter;

        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }
        if (search) {
            tasks = tasks.filter(task => task.title.includes(search));
        }

        return tasks
    }

    createTask(createTaskDTO: CreateTaskDTO) {
        const { title, description } = createTaskDTO;
        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);
        return task;
    }

    updateTaskStatus(id: string, status: TaskStatus): any{
        if (this.getTaskById(id) != undefined) {
            const newList: Task[] = this.tasks.map((task: Task) => {
                if (task.id == id) {
                    task.status = status;
                }
                return task
            })
            this.tasks = newList
            return this.getTaskById(id)
        } else {
            return {
                "error": "not found",
                "id":id
            }
        }
        
    }


    deleteTaskById(id: string): boolean {
        if (this.getTaskById(id) != undefined) {
            this.tasks = this.tasks.filter((task) => task.id !== id)
            return true
        } else {
            return false
        }
    }

}
