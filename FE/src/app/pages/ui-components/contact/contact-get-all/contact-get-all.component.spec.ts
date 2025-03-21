import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactGetAllComponent } from './contact-get-all.component';

describe('ContactGetAllComponent', () => {
  let component: ContactGetAllComponent;
  let fixture: ComponentFixture<ContactGetAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactGetAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactGetAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
