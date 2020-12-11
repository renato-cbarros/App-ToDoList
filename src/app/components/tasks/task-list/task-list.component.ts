import { TaskService } from './../../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {


  tasks: any

  constructor(private taskService: TaskService) {
    this.taskService.refresh.subscribe(tasks => {
      this.tasks = tasks
      console.log(tasks + "TESTE")
    })

  }

  ngOnInit(): void {
    console.log("TESTE 2")
    this.taskService.getTasksLocalStorage()
  }


}
