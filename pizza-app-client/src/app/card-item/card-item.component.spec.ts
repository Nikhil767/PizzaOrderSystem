import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelperService } from '../services/helper.service';
import { HttpService } from '../services/http.service';

import { CardItemComponent } from './card-item.component';

describe('CardItemComponent', () => {
  let component: CardItemComponent;
  let fixture: ComponentFixture<CardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[
        ,HttpService,
        HelperService
      ],
      declarations: [ CardItemComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(CardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });
});
