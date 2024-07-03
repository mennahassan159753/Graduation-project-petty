import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptingPetsComponent } from './adopting-pets.component';

describe('AdoptingPetsComponent', () => {
  let component: AdoptingPetsComponent;
  let fixture: ComponentFixture<AdoptingPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdoptingPetsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdoptingPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
