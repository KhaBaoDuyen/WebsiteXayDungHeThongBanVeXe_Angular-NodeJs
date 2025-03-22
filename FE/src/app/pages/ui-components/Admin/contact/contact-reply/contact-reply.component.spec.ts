import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactReplyComponent } from './contact-reply.component';

describe('ContactReplyComponent', () => {
  let component: ContactReplyComponent;
  let fixture: ComponentFixture<ContactReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactReplyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
