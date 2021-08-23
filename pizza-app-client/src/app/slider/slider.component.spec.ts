import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from '../services/http.service';

import { SliderComponent } from './slider.component';

describe('SliderComponent', () => {
  let service: HttpService;
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[
        HttpService
      ],
      declarations: [ SliderComponent ]
    })
    .compileComponents();
    service = TestBed.inject(HttpService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
