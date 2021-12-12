import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManipulationDialogComponent } from './manipulation-dialog.component';

describe('ManipulationDialogComponent', () => {
  let component: ManipulationDialogComponent;
  let fixture: ComponentFixture<ManipulationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManipulationDialogComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManipulationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
