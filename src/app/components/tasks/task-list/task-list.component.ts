import { ModalTaskUpdateComponent } from './../modal-task-update/modal-task-update.component';
import { TaskService } from './../../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {


  tasks: Task[]

  task: Task

  constructor(
    private taskService: TaskService,
    private _modalService: NgbModal
  ) {
    this.taskService.refresh.subscribe(tasks => {
      this.tasks = tasks
      console.log(tasks + "TESTE")
    })

  }

  ngOnInit(): void {
    console.log("TESTE 2")
    this.taskService.getTasksLocalStorage()
  }

  completeTask(task: Task): void {

    this.taskService.Swal.fire({
      width: 400,
      title: "Status da tarefa alterado!",
      icon: "info",
      showCancelButton: false,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'OK',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value == true) {
        let newTask = task
        newTask.status = !task.status
        this.taskService.update(task, newTask)
      }
    })

  }

  updateTask(task: Task): void {
    this.task = task
    const ref = this._modalService.open(ModalTaskUpdateComponent)
    ref.componentInstance.task = task;
    ref.componentInstance.updatedTask.subscribe((result: Task) => {
      let newTask = task
      newTask.title = result.title
      newTask.description = result.description
      this.taskService.update(task, newTask)
    })
  }

  deleteTask(task: Task): void {

    this.taskService.Swal.fire({
      width: 400,
      title: "Realmente deseja excluir a tarefa?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value == true) {
        console.log(task)
        this.taskService.delete(task)
      } else {
        this.taskService.showMessage("Tarefa não deletada!", true)
      }
    })


  }

}
