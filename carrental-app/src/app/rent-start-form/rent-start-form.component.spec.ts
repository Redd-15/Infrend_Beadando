import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentStartFormComponent } from './rent-start-form.component';

describe('RentStartFormComponent', () => {
  let component: RentStartFormComponent;
  let fixture: ComponentFixture<RentStartFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentStartFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentStartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
