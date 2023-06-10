import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRecepiesComponent } from './manage-recepies.component';

describe('ManageRecepiesComponent', () => {
  let component: ManageRecepiesComponent;
  let fixture: ComponentFixture<ManageRecepiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRecepiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRecepiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
