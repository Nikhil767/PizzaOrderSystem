import { EventEmitter, Injectable, Output } from '@angular/core';
import { Item } from '../interface/item';
import { LookupItem } from '../interface/lookupitem';
import { Order } from '../interface/order';
import { OrderDTO } from '../interface/orderdto';
import { HttpService } from './http.service';

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
    IsCustomPizza : false
  }
  pizzaItems : Item[] = [];
  customPizzaItems : Item[] = [];
  orderItems : Item[] = [];
  order : Order = {
    TotalPrize:0,
    PrizeUnit:'',
    OrderItems: this.orderItems
  }
  orderDTO : OrderDTO = {
    Email : this.email,
    Order: this.order
  };
  constructor(private httpService : HttpService) { }

  resetItem(){
    this.item = {
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
      IsCustomPizza : false
    }
  }

  addLookupItem(lookupItem : LookupItem){
    this.item.Id = lookupItem.Id;
    this.item.ImagePath = lookupItem.ImagePath;
    this.item.IsActive = lookupItem.IsActive;
    this.item.Name = lookupItem.Name;
    this.item.Prize = lookupItem.Prize;
    this.item.PrizeUnit = lookupItem.PrizeUnit;
    this.item.Quantity = lookupItem.Quantity;
    this.item.Type = lookupItem.Type;
    this.item.IsBurger = false;
    this.item.IsDrink = false;
    this.item.IsPizza = true;
    this.item.IsCustomPizza = true;

    this.customPizzaItems.push(this.item);
    this.resetItem();
    this.totalPrize += lookupItem.Prize;
    this.prizeUpdatedEvent.emit(this.totalPrize);
  }

  addItem(newItem : Item){
    this.item = newItem;
    this.pizzaItems.push(this.item);
    this.resetItem();
    this.totalPrize += newItem.Prize;
    this.prizeUpdatedEvent.emit(this.totalPrize);
  }

  removeItem(oldItem : Item){
    this.pizzaItems = this.pizzaItems.filter(item => item.Name !== oldItem.Name);
    this.validateMinCart(oldItem.Prize);
    this.prizeUpdatedEvent.emit(this.totalPrize);
  }

  validateMinCart(currentPrize : number){
    let value = this.totalPrize - currentPrize;
    if(value < 0){
      alert('invalid amount');
    }else{
      this.totalPrize -= currentPrize;
    }
  }

  placeOrder(email : string){
    this.orderDTO.Email = email;
    this.orderDTO.Order.PrizeUnit = 'Ruppes';
    this.orderDTO.Order.TotalPrize = this.totalPrize;
    this.orderDTO.Order.OrderItems = [...this.pizzaItems,...this.customPizzaItems];
    this.httpService.postUserOrder(this.orderDTO).subscribe(data => {
      console.log(data);
    });
  }

  clearCart(){
    this.email = '';
    this.resetItem();
    this.totalPrize = 0;
    this.pizzaItems = [];
    this.orderItems = [];
    this.customPizzaItems = [];
  }

}
