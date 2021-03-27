import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerRecordDisplayComponent } from './tracker-record-display.component';

describe('TrackerRecordDisplayComponent', () => {
  let component: TrackerRecordDisplayComponent;
  let fixture: ComponentFixture<TrackerRecordDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerRecordDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerRecordDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
