import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantShowComponent } from './restaurant-show.component';

describe('RestaurantShowComponent', () => {
  let component: RestaurantShowComponent;
  let fixture: ComponentFixture<RestaurantShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
