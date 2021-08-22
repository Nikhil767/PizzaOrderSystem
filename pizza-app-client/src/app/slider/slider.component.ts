import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {

  sliderItems : any;
  subscription : Subscription;
  constructor(private httpService : HttpService) { 
      this.subscription = httpService.getSliderConfigs('slider').subscribe(x => {
      this.sliderItems = x.Data
    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
