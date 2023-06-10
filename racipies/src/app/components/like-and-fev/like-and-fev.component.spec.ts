import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeAndFevComponent } from './like-and-fev.component';

describe('LikeAndFevComponent', () => {
  let component: LikeAndFevComponent;
  let fixture: ComponentFixture<LikeAndFevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikeAndFevComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikeAndFevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
