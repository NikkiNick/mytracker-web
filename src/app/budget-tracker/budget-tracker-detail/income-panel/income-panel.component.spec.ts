import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomePanelComponent } from './income-panel.component';

describe('IncomePanelComponent', () => {
  let component: IncomePanelComponent;
  let fixture: ComponentFixture<IncomePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
