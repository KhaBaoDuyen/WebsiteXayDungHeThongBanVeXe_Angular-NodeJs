import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesEditComponent } from './routes-edit.component';

describe('RoutesEditComponent', () => {
  let component: RoutesEditComponent;
  let fixture: ComponentFixture<RoutesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutesEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
