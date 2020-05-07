import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSinAreaComponent } from './book-sin-area.component';

describe('BookSinAreaComponent', () => {
  let component: BookSinAreaComponent;
  let fixture: ComponentFixture<BookSinAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookSinAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSinAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
