import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookspaceComponent } from './bookspace.component';

describe('BookspaceComponent', () => {
  let component: BookspaceComponent;
  let fixture: ComponentFixture<BookspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
