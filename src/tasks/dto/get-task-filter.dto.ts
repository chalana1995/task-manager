import { TaskStatus } from "../task.model";


export class GetTaskFillterDTO {
    status: TaskStatus;
    search:string
}