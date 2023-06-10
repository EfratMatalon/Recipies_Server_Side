import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReccomenedToAddComponent } from './reccomened-to-add.component';

describe('ReccomenedToAddComponent', () => {
  let component: ReccomenedToAddComponent;
  let fixture: ComponentFixture<ReccomenedToAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReccomenedToAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReccomenedToAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
