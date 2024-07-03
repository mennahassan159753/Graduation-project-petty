import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselAdoptingPetsComponent } from './carousel-adopting-pets.component';

describe('CarouselAdoptingPetsComponent', () => {
  let component: CarouselAdoptingPetsComponent;
  let fixture: ComponentFixture<CarouselAdoptingPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselAdoptingPetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselAdoptingPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
