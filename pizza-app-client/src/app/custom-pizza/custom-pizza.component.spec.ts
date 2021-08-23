import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from '../services/http.service';

import { CustomPizzaComponent } from './custom-pizza.component';

describe('CustomPizzaComponent', () => {
  let component: CustomPizzaComponent;
  let fixture: ComponentFixture<CustomPizzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[
        HttpService
      ],
      declarations: [ CustomPizzaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
