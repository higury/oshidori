import { Injectable, Injector } from '@angular/core';
import { Task } from "../models/task";
import { BaseRepository } from './base.repository';

@Injectable()
export class TaskRepository extends BaseRepository {

    constructor(injector: Injector) {
        super(injector);
     }

    public add(task: Task): Promise<any> {
        return super.addToRootCollection(task);
    }

    public update(task: Task): void {
        throw new Error('not implemented');
    }

    public delete(task: Task): void {
        throw new Error('not implemented');
    }
}