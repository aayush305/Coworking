import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookAreaComponent } from './edit-book-area.component';

describe('EditBookAreaComponent', () => {
  let component: EditBookAreaComponent;
  let fixture: ComponentFixture<EditBookAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBookAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
