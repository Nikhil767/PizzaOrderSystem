import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.css']
})
export class OrderCartComponent {

  totalPrize : number = 0;
  subscription : Subscription;
  regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  constructor(private helperService: HelperService) {
    this.subscription = this.helperService.prizeUpdatedEvent.subscribe(x=>{
      this.totalPrize = x;
    });
  }

  askforEmail(){
    let email = prompt('please provide email for placing the order','email id');
    if(email){
      let isValid = this.regexp.test(email.toString());
      if(isValid){
        alert('order placed successfully for : '+ email );
        this.helperService.placeOrder();
        return;
      }      
    }
    alert('without email order can not be placed');
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
