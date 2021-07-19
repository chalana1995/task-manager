import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFillterDTO } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {


    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }


    async getTasks(getTaskDto: GetTaskFillterDTO): Promise<Task[]> {
        return this.taskRepository.getTasks(getTaskDto);
    }

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }


    // getTaskWithFilter(filterDto: GetTaskFillterDTO): Task[] {
    //     const { status, search } = filterDto;

    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter(tasks => tasks.status === status);
    //     }

    //     if (search) {
    //         tasks = tasks.filter(task =>
    //             task.title.includes(search) ||
    //             task.description.includes(search)
    //         )
    //     }


    //     return tasks;
    // }

    async getTaskById(id: number): Promise<Task> {
        const find = await this.taskRepository.findOne(id);

        if (!find) {
            throw new NotFoundException(`Task with ID "${id}" Not Found`);
        }

        return find;
    }

    async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }


    async deleteTask(id: number): Promise<void> {
        let result = await this.taskRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" Not Found`);
        }

    }

    async updateTask(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);

        task.status = status;

        await task.save();

        return task;

    }

    // updateTask(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);

    //     task.status = status;
    //     return task
    // }
}
