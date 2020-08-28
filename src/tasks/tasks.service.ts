import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';


export class TasksService {
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {}

    getTasks(filterDTO: GetTaskFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDTO);
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`${id} not found`)
        }
        return found;
    }

    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
       return this.taskRepository.createTask(createTaskDTO);
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task  = await this.taskRepository.findOne(id);
        task.status = status;
        await task.save();
        return task;
    }

    async deleteTaskById(id: number): Promise<Task> {
        const found  = await this.taskRepository.findOne(id);
        return this.taskRepository.remove(found)
    }

}