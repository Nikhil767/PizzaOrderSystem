import { Component, OnInit } from '@angular/core';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.css']
})
export class OrderCartComponent implements OnInit {

  totalPrize : number = 0;
  constructor(private helperService: HelperService) { }
  ngOnInit(): void {
    this.helperService.prizeUpdatedEvent.subscribe(x=>{
      this.totalPrize = x;
    });
  }

}
