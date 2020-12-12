import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTaskUpdateComponent } from './modal-task-update.component';

describe('ModalTaskUpdateComponent', () => {
  let component: ModalTaskUpdateComponent;
  let fixture: ComponentFixture<ModalTaskUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTaskUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTaskUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
