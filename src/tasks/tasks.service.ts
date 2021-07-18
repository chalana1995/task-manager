import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFillterDTO } from './dto/get-task-filter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {


    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }

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

    // createTask(createTaskDto: CreateTaskDTO): Task {

    //     const { title, description } = createTaskDto;

    //     let task: Task = {
    //         id: uuidv4(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     }

    //     this.tasks.push(task);

    //     return task;
    // }

    // deleteTask(id: string): void {
    //     const found = this.getTaskById(id)
    //     this.tasks = this.tasks.filter(task => task.id !== found.id);
    // }

    // updateTask(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);

    //     task.status = status;
    //     return task
    // }
}
