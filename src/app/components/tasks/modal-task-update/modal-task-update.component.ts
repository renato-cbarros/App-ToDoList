import { TaskService } from './../../../services/task.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-modal-task-update',
  templateUrl: './modal-task-update.component.html',
  styleUrls: ['./modal-task-update.component.css']
})
export class ModalTaskUpdateComponent implements OnInit {

  @Output() updatedTask: EventEmitter<any> = new EventEmitter

  public form: FormGroup

  @Input()
  task: Task

  constructor(
    private modalActive: NgbActiveModal,
    private formBuilder: FormBuilder,
    private taskService: TaskService
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
    console.log(this.task)
    this.form.get('_title').setValue(this.task.title)
    this.form.get('_description').setValue(this.task.description);
  }

  update() {

    this.taskService.Swal.fire({
      width: 400,
      title: "Deseja reamente alterar a tarefa?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value == true) {
        this.task.title = this.form.value._title
        this.task.description = this.form.value._description
        this.updatedTask.emit(this.task)
        this.taskService.showMessage("Tarefa alterada!", false)
        this.modalActive.close()
      } else {
        this.taskService.showMessage("Tarefa não alterada!", true)
        this.modalActive.close()
      }
    })
  };

  close() {
    this.modalActive.close();
  };

}
