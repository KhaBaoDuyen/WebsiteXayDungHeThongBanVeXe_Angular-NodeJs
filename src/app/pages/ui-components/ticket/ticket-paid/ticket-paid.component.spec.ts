import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPaidComponent } from './ticket-paid.component';

describe('TicketPaidComponent', () => {
  let component: TicketPaidComponent;
  let fixture: ComponentFixture<TicketPaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketPaidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
