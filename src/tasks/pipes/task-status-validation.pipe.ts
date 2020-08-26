import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [ //readonly => class members wont be allowed to modify it
        TaskStatus.OPEN,
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS
    ];

    
    
    transform(value: any) {
        
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is an invalid status.`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        const idx = this.allowedStatuses.indexOf(status)
        return idx !== -1;
    }
}