import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BustypeGetAllComponent } from './bustype-get-all.component';

describe('BustypeGetAllComponent', () => {
  let component: BustypeGetAllComponent;
  let fixture: ComponentFixture<BustypeGetAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BustypeGetAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BustypeGetAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
