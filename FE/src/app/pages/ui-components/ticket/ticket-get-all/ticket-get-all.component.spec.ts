import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketGetAllComponent } from './ticket-get-all.component';

describe('TicketGetAllComponent', () => {
  let component: TicketGetAllComponent;
  let fixture: ComponentFixture<TicketGetAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketGetAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketGetAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
