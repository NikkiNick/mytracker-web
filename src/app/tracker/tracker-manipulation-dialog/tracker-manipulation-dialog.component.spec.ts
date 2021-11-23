import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerManipulationDialogComponent } from './tracker-manipulation-dialog.component';

describe('TrackerManipulationDialogComponent', () => {
  let component: TrackerManipulationDialogComponent;
  let fixture: ComponentFixture<TrackerManipulationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerManipulationDialogComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerManipulationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
