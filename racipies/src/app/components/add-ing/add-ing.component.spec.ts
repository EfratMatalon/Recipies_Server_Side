import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIngComponent } from './add-ing.component';

describe('AddIngComponent', () => {
  let component: AddIngComponent;
  let fixture: ComponentFixture<AddIngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIngComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
