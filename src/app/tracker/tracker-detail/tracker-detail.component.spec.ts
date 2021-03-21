import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerDetailComponent } from './tracker-detail.component';

describe('TrackerDetailComponent', () => {
  let component: TrackerDetailComponent;
  let fixture: ComponentFixture<TrackerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
