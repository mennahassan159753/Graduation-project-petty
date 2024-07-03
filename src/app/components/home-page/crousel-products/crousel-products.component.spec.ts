import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrouselProductsComponent } from './crousel-products.component';

describe('CrouselProductsComponent', () => {
  let component: CrouselProductsComponent;
  let fixture: ComponentFixture<CrouselProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrouselProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrouselProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
