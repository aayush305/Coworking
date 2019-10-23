import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbookingComponent } from './editbooking.component';

describe('EditbookingComponent', () => {
  let component: EditbookingComponent;
  let fixture: ComponentFixture<EditbookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditbookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
