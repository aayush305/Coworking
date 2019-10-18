import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqvisitComponent } from './reqvisit.component';

describe('ReqvisitComponent', () => {
  let component: ReqvisitComponent;
  let fixture: ComponentFixture<ReqvisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqvisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqvisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
