import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIngridientsComponent } from './manage-ingridients.component';

describe('ManageIngridientsComponent', () => {
  let component: ManageIngridientsComponent;
  let fixture: ComponentFixture<ManageIngridientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageIngridientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageIngridientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
