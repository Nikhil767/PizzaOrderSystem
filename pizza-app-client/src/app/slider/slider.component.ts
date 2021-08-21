import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  sliderItems : any;
  constructor(private httpService : HttpService) { 
      httpService.getSliderConfigs('slider').subscribe(x => {
      this.sliderItems = x.Data
      //console.log(x)
    });
  }

  ngOnInit(): void {
  }

}
