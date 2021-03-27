import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerRecordAddComponent } from './tracker-record-add.component';

describe('TrackerRecordAddComponent', () => {
  let component: TrackerRecordAddComponent;
  let fixture: ComponentFixture<TrackerRecordAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerRecordAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerRecordAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
