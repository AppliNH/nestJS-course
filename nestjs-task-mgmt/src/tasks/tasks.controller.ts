import { Controller, Get, Post, Body, Delete, Param, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    // "private" here allows us to use this.tasksService
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query() filter: GetTaskFilterDto): Task[] {
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
    createTask(
        // @Body("title") title: string, // get title from body
        // @Body("description") description: string,
        @Body() createTaskDTO: CreateTaskDTO): Task {
        return this.tasksService.createTask(createTaskDTO);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus) {
        return this.tasksService.updateTaskStatus(id, status);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): object {
        if (this.tasksService.deleteTaskById(id)) {
            return {
                "state": "Sucess",
                "id":id
            }
        } else {
            return {
                "state": "failure",
                "id":id
            }
        }
    }

    

}
