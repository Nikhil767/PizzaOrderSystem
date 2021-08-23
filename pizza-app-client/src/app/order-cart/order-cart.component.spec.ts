import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from '../services/http.service';

import { OrderCartComponent } from './order-cart.component';

describe('OrderCartComponent', () => {
  let service: HttpService;
  let component: OrderCartComponent;
  let fixture: ComponentFixture<OrderCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[
        HttpService
      ],
      declarations: [ OrderCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
