import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewUsPage } from './review-us.page';

describe('ReviewUsPage', () => {
  let component: ReviewUsPage;
  let fixture: ComponentFixture<ReviewUsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewUsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewUsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
