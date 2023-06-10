import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageResponsesComponent } from './manage-responses.component';

describe('ManageResponsesComponent', () => {
  let component: ManageResponsesComponent;
  let fixture: ComponentFixture<ManageResponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageResponsesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
