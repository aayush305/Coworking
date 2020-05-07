import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVisitReqComponent } from './view-visit-req.component';

describe('ViewVisitReqComponent', () => {
  let component: ViewVisitReqComponent;
  let fixture: ComponentFixture<ViewVisitReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVisitReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVisitReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
