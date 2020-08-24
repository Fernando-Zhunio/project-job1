import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPeticionComponent } from './modal-peticion.component';

describe('ModalPeticionComponent', () => {
  let component: ModalPeticionComponent;
  let fixture: ComponentFixture<ModalPeticionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPeticionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPeticionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
