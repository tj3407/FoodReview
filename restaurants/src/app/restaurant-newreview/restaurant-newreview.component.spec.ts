import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantNewreviewComponent } from './restaurant-newreview.component';

describe('RestaurantNewreviewComponent', () => {
  let component: RestaurantNewreviewComponent;
  let fixture: ComponentFixture<RestaurantNewreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantNewreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantNewreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
