import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordPanelComponent } from './record-panel.component';

describe('RecordPanelComponent', () => {
  let component: RecordPanelComponent;
  let fixture: ComponentFixture<RecordPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
