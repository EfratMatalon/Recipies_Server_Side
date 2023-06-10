import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullRecipyComponent } from './full-recipy.component';

describe('FullRecipyComponent', () => {
  let component: FullRecipyComponent;
  let fixture: ComponentFixture<FullRecipyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullRecipyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullRecipyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
