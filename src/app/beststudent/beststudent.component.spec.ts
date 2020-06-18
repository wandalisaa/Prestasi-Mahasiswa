import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeststudentComponent } from './beststudent.component';

describe('BeststudentComponent', () => {
  let component: BeststudentComponent;
  let fixture: ComponentFixture<BeststudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeststudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeststudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
