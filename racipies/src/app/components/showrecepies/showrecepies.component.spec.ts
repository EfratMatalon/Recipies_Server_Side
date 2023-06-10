import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowrecepiesComponent } from './showrecepies.component';

describe('ShowrecepiesComponent', () => {
  let component: ShowrecepiesComponent;
  let fixture: ComponentFixture<ShowrecepiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowrecepiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowrecepiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
