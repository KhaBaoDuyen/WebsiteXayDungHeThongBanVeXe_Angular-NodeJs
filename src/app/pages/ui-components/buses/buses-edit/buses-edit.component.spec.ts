import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusesEditComponent } from './buses-edit.component';

describe('BusesEditComponent', () => {
  let component: BusesEditComponent;
  let fixture: ComponentFixture<BusesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusesEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
