import { EventEmitter, Injectable, Output } from '@angular/core';
import { Item } from '../interface/item';
import { LookupItem } from '../interface/lookupitem';
import { Order } from '../interface/order';
import { OrderDTO } from '../interface/orderdto';
import { Pizaa } from '../interface/pizaa';
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
  }
  pizzaItems : Item[] = [];
  pizza : Pizaa = {
    IsCustomPizza : false,
    PizzaItems : this.pizzaItems
  }
  customPizzaItems : Item[] = [];
  customPizza : Pizaa = {
    IsCustomPizza : true,
    PizzaItems : this.customPizzaItems
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
  constructor(private httpService : HttpService) { }

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
    this.orderDTO.Order.OrderItems.concat()
    // placeUserOrder with final orderDTO object
    //this.httpService.postUserOrder(this.orderDTO);
  }

  clearCart(){
    this.email = '';
    this.totalPrize = 0;
    this.resetItem();
    this.pizzaItems = [];
    this.orderItems = [];
  }

}
