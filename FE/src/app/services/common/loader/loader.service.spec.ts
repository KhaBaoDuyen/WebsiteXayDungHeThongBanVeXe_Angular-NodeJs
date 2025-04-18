import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let component: LoaderService;
  let fixture: ComponentFixture<LoaderService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
