import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = []

  constructor(private snackBar: MatSnackBar) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  validFields(task: Task): boolean {
    let ver: boolean = false
    if (task.title == null || task.title == undefined || task.title == '' 
    || task.description == null || task.description == undefined || task.description == '') {
      ver = true
    }
    return ver
  }

  create(task: Task): void {
    this.tasks.push(task);
  }

  save(task: Task): Observable<Task[]> {
    return
  }

  getTasks(): Array<Task> {
    return this.tasks
  }

}
