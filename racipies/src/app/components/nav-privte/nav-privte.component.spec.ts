import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavPrivteComponent } from './nav-privte.component';

describe('NavPrivteComponent', () => {
  let component: NavPrivteComponent;
  let fixture: ComponentFixture<NavPrivteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavPrivteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavPrivteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
