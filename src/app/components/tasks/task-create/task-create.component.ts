import { TaskService } from './../../../services/task.service';
import { Task } from './../../../models/task.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  task: Task = {
    title: '',
    description: '',
    status: false
  }

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  creanFields(): void {
    this.task.title = ''
    this.task.description = ''
  }

  cancel(): void {
    this.creanFields()
    this.taskService.showMessage("Criação de tarefa cancelada!", true)
  }

  createTask(): void {
    let ver: boolean = this.taskService.validFields(this.task)
    if (ver) {
      this.taskService.showMessage("Erro! Campos em branco ou não preenchidos!", true)
    } else {
      this.taskService.create(this.task)
      this.taskService.showMessage("Tarefa criada!", false)
    }
  }

  saveTask(): void {
    let ver: boolean = this.taskService.validFields(this.task)
    if (ver) {
      this.taskService.showMessage("Erro! Campos em branco ou não preenchidos!", true)
    } else {
      this.taskService.showMessage("Tarefa salva!", false)
    }
  }


}
