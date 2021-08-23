import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelperService } from '../services/helper.service';
import { HttpService } from '../services/http.service';

import { GridComponent } from './grid.component';

describe('GridComponent', () => {
  let htppService: HttpService;
  let service: HelperService;
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[
        HelperService,
        HttpService
      ],
      declarations: [ GridComponent ]
    })
    .compileComponents();
    htppService = TestBed.inject(HttpService);
    service = TestBed.inject(HelperService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
