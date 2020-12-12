import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private key = 'tasks'
  public tasks: Array<Task> = []
  public refresh: BehaviorSubject<any> = new BehaviorSubject([])
  public Swal = require('sweetalert2')

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

  set(task: Task): void {
    let id: number = this.tasks.length + 1
    this.tasks.push(new Task(id, task.title, task.description, task.status))
    this.refresh.next(this.tasks)
  }

  getTaskList(): Array<Task> {
    return this.tasks
  }

  update(task: Task, newTask: Task) {
    let position = this.tasks.indexOf(task)
    if (position == -1) {
      this.showMessage('Erro ao atualizar tarefa!')
    } else {
      this.showMessage('Tarefa atualizada com sucesso!')
      this.tasks[position] = newTask
    }
    console.log(this.tasks)
    this.refresh.next(this.tasks)
  }

  delete(task: Task): void {
    let position = this.tasks.indexOf(task)
    if (position == -1) {
      this.showMessage('Erro ao atualizar tarefa!')
    } else {
      this.tasks.splice(position, 1)
      this.showMessage('Tarefa deletada com sucesso!')
    }
    this.refresh.next(this.tasks)
  }

  save() {
    console.log(this.tasks)
    localStorage.setItem(this.key, JSON.stringify(this.tasks))
  }

  getTasksLocalStorage(): void {
    let data = JSON.parse(localStorage.getItem(this.key))
    for (const i in data) {
      this.tasks.push(data[i])
    }
    this.refresh.next(this.tasks)
  }
}
