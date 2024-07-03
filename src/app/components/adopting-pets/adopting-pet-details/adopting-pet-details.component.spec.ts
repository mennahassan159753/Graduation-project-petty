import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptingPetDetailsComponent } from './adopting-pet-details.component';

describe('AdoptingPetDetailsComponent', () => {
  let component: AdoptingPetDetailsComponent;
  let fixture: ComponentFixture<AdoptingPetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdoptingPetDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptingPetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
