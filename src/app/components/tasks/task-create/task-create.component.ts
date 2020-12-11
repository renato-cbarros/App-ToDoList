import { TaskService } from './../../../services/task.service';
import { Task } from './../../../models/task.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
  public form: FormGroup;

  task: Task = {
    id: 0,
    title: '',
    description: '',
    status: false
  }

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      '_title': [null, Validators.compose([
        Validators.required,
      ])],
      '_description': [null, Validators.compose([
        Validators.required,
      ])],
    })
  }

  ngOnInit(): void {
  }

  creanFields(): void {
    this.form.get('_title').setValue('')
    this.form.get('_description').setValue('');
  }

  cancel(): void {
    this.creanFields()
    this.taskService.showMessage("Criação de tarefa cancelada!", true)
    this.taskService.deleteAllStorage()
  }

  createTask(): void {
    this.task.title = this.form.value._title
    this.task.description = this.form.value._description
    let ver: boolean = this.taskService.validFields(this.task)
    if (ver) {
      this.taskService.showMessage("Erro! Campos em branco ou não preenchidos!", true)
    } else {
      this.taskService.create(this.task)
      this.taskService.showMessage("Tarefa criada!", false)
      this.creanFields()
      
    }
  }

  saveTask(): void {
      console.log(this.taskService.getTasks()+ "AAAAAAAAAAAAAAAAA")
      this.taskService.saveTaks();
      this.taskService.showMessage("Tarefa salva!", false)
  }


}
