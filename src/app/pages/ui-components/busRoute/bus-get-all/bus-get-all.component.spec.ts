import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusGetAllComponent } from './bus-get-all.component';

describe('BusGetAllComponent', () => {
  let component: BusGetAllComponent;
  let fixture: ComponentFixture<BusGetAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusGetAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusGetAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
