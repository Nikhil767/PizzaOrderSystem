import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {

  PageSize = 8;
  PageNumber = 1;
  dashboardItems : any;
  subscription : Subscription;
  constructor(private httpService : HttpService) { 
    this.subscription = httpService.getDashboardConfigs('dashboard' + '/' + this.PageSize + '/'+ this.PageNumber).subscribe(x => 
    {
      if(x){
        this.dashboardItems = x.Data
      }
    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
