import { EventEmitter, Injectable, Output } from '@angular/core';
import { Item } from '../interface/item';
import { LookupItem } from '../interface/lookupitem';
import { Order } from '../interface/order';
import { OrderDTO } from '../interface/orderdto';
import { Pizaa } from '../interface/pizaa';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  totalPrize : number = 0;
  @Output() prizeUpdatedEvent = new EventEmitter<number>();

  email : string = '';
  lookupItem : LookupItem ={
    Id: '',
    Name: '',
    Prize: 0,
    Quantity: 0,
    Type: '',
    IsActive: false,
    ImagePath: '',
    PrizeUnit: '',
  }
  item : Item = {
    Id: '',
    Name: '',
    Prize: 0,
    Quantity: 0,
    Type: '',
    IsActive: false,
    ImagePath: '',
    PrizeUnit: '',
    IsDrink : false,
    IsBurger : false,
    IsPizza : false,
  }
  pizzaItems : Item[] = [];
  pizza : Pizaa = {
    IsCustomPizza : false,
    PizzaItems : this.pizzaItems
  }
  orderItems : Pizaa[] = [];
  order : Order = {
    TotalPrize:0,
    PrizeUnit:'',
    OrderItems: this.orderItems
  }
  orderDTO : OrderDTO = {
    Email : this.email,
    Order: this.order
  };
  constructor() { }

  initializeOrderObject(){
    this.orderDTO = {
      Email : this.email,
      Order: {
        TotalPrize:0,
        PrizeUnit:'',
        OrderItems:[
          {
            IsCustomPizza : false,
            PizzaItems : [
              {
                Id: '',
                Name: '',
                Prize: 0,
                Quantity: 0,
                Type: '',
                IsActive: false,
                ImagePath: '',
                PrizeUnit: '',
                IsDrink : false,
                IsBurger : false,
                IsPizza : false,
              }
            ]
          }
        ]
      }
    }
  }

  addLookupItem(item : LookupItem){

    this.totalPrize += item.Prize;
    this.prizeUpdatedEvent.emit(this.totalPrize);
  }

  addItem(item : Item){    
    this.totalPrize += item.Prize;
    this.prizeUpdatedEvent.emit(this.totalPrize);
  }

  removeItem(item : Item){    
    this.totalPrize -= item.Prize;
    this.prizeUpdatedEvent.emit(this.totalPrize);
  }

}
