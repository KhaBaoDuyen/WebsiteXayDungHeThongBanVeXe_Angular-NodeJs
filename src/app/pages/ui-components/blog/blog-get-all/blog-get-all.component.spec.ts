import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogGetAllComponent } from './blog-get-all.component';

describe('BlogGetAllComponent', () => {
  let component: BlogGetAllComponent;
  let fixture: ComponentFixture<BlogGetAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogGetAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogGetAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
