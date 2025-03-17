import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusesGetAllComponent } from './buses-get-all.component';

describe('BusesGetAllComponent', () => {
  let component: BusesGetAllComponent;
  let fixture: ComponentFixture<BusesGetAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusesGetAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusesGetAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
