import { NotFoundException } from '@nestjs/common';
// Testing for tasks.service.ts

import { Test } from '@nestjs/testing';
import { userInfo } from 'os';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';


const mockUser = {id: 12, username: "TestUser" };

const mockTaskRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),
    createTask: jest.fn(),
    remove: jest.fn()
});


describe("Tasks_Services", () => {

    let tasksService;
    let taskRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({ // Creating a whole module for testing purposes. Re-created for each tests.
            providers: [
                TasksService,
                { provide: TaskRepository, useFactory: mockTaskRepository } // For each test, we reload a new mock of the repository
            ]
        }).compile();

        tasksService = await module.get<TasksService>(TasksService);
        taskRepository = await module.get<TaskRepository>(TaskRepository);
    });


    describe("getTasks", () => {

        it("gets all tasks from the repository", async () => {
            taskRepository.getTasks.mockResolvedValue("valueblabla");

            expect(taskRepository.getTasks).not.toHaveBeenCalled();

            const filters: GetTaskFilterDto = { status: TaskStatus.IN_PROGRESS, search: "Some search query" };

            const results = await tasksService.getTasks(filters, mockUser);
            expect(taskRepository.getTasks).toHaveBeenCalled();
            expect(results).toEqual("valueblabla");



        });

    })


    describe("getTaskById", () => {


        it("calls taskRepo.findOne and successfully retrieves and returns the task", async () => {
            const mockTask = {title: "title", description: "desc"};
            taskRepository.findOne.mockResolvedValue(mockTask);

            const result = await tasksService.getTaskById(1, mockUser)

            expect(result).toEqual(mockTask);
            expect(taskRepository.findOne).toHaveBeenCalledWith({
                where: {
                    id:1, 
                    userId: mockUser.id,
                }
            });


        });

        it("throws an error as task not found", () => {

            taskRepository.findOne.mockResolvedValue(null);

            expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow(NotFoundException); // expect the catch an exception.

        });


    })


    describe("createTask", () => {


        it("try to create a task", async () => {    
            taskRepository.createTask.mockResolvedValue("someTask")
            expect(taskRepository.createTask).not.toHaveBeenCalled();


            const mockTask = {title: "title", description: "desc"}
            const result = await tasksService.createTask(mockTask, mockUser);

            expect(taskRepository.createTask).toHaveBeenCalledWith(mockTask, mockUser);

            expect(result).toEqual("someTask");

        });


    });




});