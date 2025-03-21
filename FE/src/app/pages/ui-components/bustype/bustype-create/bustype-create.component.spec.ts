import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BustypeCreateComponent } from './bustype-create.component';

describe('BustypeCreateComponent', () => {
  let component: BustypeCreateComponent;
  let fixture: ComponentFixture<BustypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BustypeCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BustypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
