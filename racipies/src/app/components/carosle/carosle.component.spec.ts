import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarosleComponent } from './carosle.component';

describe('CarosleComponent', () => {
  let component: CarosleComponent;
  let fixture: ComponentFixture<CarosleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarosleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarosleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
