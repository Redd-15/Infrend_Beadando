import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentEndFormComponent } from './rent-end-form.component';

describe('RentEndFormComponent', () => {
  let component: RentEndFormComponent;
  let fixture: ComponentFixture<RentEndFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentEndFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentEndFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
