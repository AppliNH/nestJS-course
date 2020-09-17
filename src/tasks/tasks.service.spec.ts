// Testing for tasks.service.ts

import { Test } from '@nestjs/testing';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';


const mockUser = { username: "TestUser" };

const mockTaskRepository = () => ({
    getTasks: jest.fn(),
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

});