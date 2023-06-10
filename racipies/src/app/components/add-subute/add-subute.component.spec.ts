import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubuteComponent } from './add-subute.component';

describe('AddSubuteComponent', () => {
  let component: AddSubuteComponent;
  let fixture: ComponentFixture<AddSubuteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubuteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
