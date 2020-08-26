import { Controller, Get, Post, Body, Delete, Param, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    // "private" here allows us to use this.tasksService
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filter: GetTaskFilterDto): Task[] {
        if(Object.keys(filter).length) {
            return this.tasksService.getTasksWithFilter(filter);
        }
        return this.tasksService.getAllTasks();
    }
    
    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }


    @Post()
    @UsePipes(ValidationPipe) // Will validate incoming data against the DTO
    createTask(
        // @Body("title") title: string, // get title from body
        // @Body("description") description: string,
        @Body() createTaskDTO: CreateTaskDTO): Task {
        return this.tasksService.createTask(createTaskDTO);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
        return this.tasksService.updateTaskStatus(id, status);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): Task {
        return this.tasksService.deleteTaskById(id);
        
    }

    

}
