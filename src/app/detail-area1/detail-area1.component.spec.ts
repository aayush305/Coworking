import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailArea1Component } from './detail-area1.component';

describe('DetailArea1Component', () => {
  let component: DetailArea1Component;
  let fixture: ComponentFixture<DetailArea1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailArea1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailArea1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
