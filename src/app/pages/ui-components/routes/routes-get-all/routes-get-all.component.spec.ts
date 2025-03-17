import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesGetAllComponent } from './routes-get-all.component';

describe('RoutesGetAllComponent', () => {
  let component: RoutesGetAllComponent;
  let fixture: ComponentFixture<RoutesGetAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutesGetAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutesGetAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
