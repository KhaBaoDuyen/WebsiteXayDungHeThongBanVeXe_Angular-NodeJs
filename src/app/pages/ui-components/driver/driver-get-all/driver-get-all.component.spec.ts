import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverGetAllComponent } from './driver-get-all.component';

describe('DriverGetAllComponent', () => {
  let component: DriverGetAllComponent;
  let fixture: ComponentFixture<DriverGetAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverGetAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverGetAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
