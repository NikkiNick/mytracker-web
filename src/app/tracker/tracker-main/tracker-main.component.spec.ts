import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerMainComponent } from './tracker-main.component';

describe('TrackerMainComponent', () => {
  let component: TrackerMainComponent;
  let fixture: ComponentFixture<TrackerMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
