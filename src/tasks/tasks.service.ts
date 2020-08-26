import { Injectable, NotFoundException } from '@nestjs/common';
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

        const found = this.tasks.find((task) => task.id == id);
        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        } else {
            return found
        }
    }

    getTasksWithFilter(filter: GetTaskFilterDto): Task[] {
        const { status, search } = filter;

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

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const found = this.getTaskById(id) // Will throw error message if not found

        const newList: Task[] = this.tasks.map((task: Task) => {
            if (task.id == id) {
                task.status = status;
            }
            return task
        })
        this.tasks = newList
        return this.getTaskById(id) // UpdatedTask


    }


    deleteTaskById(id: string): Task {
        const found = this.getTaskById(id) // Will throw error message if not found
        this.tasks = this.tasks.filter((task) => task.id !== id)
        return found
    }

}
