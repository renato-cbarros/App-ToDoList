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
  }

  createTask(): void {
    this.task.title = this.form.value._title
    this.task.description = this.form.value._description
    let ver: boolean = this.taskService.validFields(this.task)
    if (ver) {
      this.taskService.showMessage("Erro! Campos em branco ou não preenchidos!", true)
    } else {
      this.taskService.set(this.task)
      this.taskService.showMessage("Tarefa criada!", false)
      this.creanFields()

    }
  }

  saveTask(): void {

    this.taskService.Swal.fire({
      width: 400,
      title: "Deseja realmente salvar as informações?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value == true) {
        this.taskService.save();
        this.taskService.showMessage("Tarefas salvas!", false)
      } else {
        this.taskService.showMessage("Tarefas não salvas!", true)
      }
    })

  }


}
