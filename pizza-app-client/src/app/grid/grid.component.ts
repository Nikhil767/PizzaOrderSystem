import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  PageSize = 8;
  PageNumber = 1;
  dashboardItems : any;
  constructor(private httpService : HttpService) { 
    httpService.getDashboardConfigs('dashboard' + '/' + this.PageSize + '/'+ this.PageNumber).subscribe(x => 
    {
      if(x){
        this.dashboardItems = x.Data
      }
      console.log(x)
    });
  }

  ngOnInit(): void {
  }

}
