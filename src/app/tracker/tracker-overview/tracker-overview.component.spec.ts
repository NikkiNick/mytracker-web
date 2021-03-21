import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerOverviewComponent } from './tracker-overview.component';

describe('TrackerOverviewComponent', () => {
  let component: TrackerOverviewComponent;
  let fixture: ComponentFixture<TrackerOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
