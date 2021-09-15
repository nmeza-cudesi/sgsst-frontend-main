import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRiesgoComponent } from './modal-riesgo.component';

describe('ModalRiesgoComponent', () => {
  let component: ModalRiesgoComponent;
  let fixture: ComponentFixture<ModalRiesgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRiesgoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRiesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
