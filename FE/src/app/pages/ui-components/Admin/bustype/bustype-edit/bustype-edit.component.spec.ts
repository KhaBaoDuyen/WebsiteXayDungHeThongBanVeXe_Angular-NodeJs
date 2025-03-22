import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BustypeEditComponent } from './bustype-edit.component';

describe('BustypeEditComponent', () => {
  let component: BustypeEditComponent;
  let fixture: ComponentFixture<BustypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BustypeEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BustypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
