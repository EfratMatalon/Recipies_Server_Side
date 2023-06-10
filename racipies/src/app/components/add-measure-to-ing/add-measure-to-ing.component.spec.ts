import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeasureToIngComponent } from './add-measure-to-ing.component';

describe('AddMeasureToIngComponent', () => {
  let component: AddMeasureToIngComponent;
  let fixture: ComponentFixture<AddMeasureToIngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMeasureToIngComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMeasureToIngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
