import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../interface/item';
import { LookupItem } from '../interface/lookupitem';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent {

  disabledAddButtons : number[] = [];
  disabledRemoveButtons : number[] = [];
  @Input() index : number = 0;
  @Input() type : string = '';
  @Input() cardItem : any;
  @Input() showAddToCart : boolean = false;  
  @Output() itemSelectEvent = new EventEmitter<string>();
  constructor(private helperService : HelperService) { }

  incrementQuantity(item : Item, index : number){
    let ind = this.disabledRemoveButtons.indexOf(index) 
    ind > -1 ?  this.disabledRemoveButtons.splice(index, 1) : 0;
    this.disabledAddButtons.push(index);
    this.helperService.addItem(item);
  }

  decrementQuantity(item : Item, index : number){
    let ind = this.disabledAddButtons.indexOf(index) 
    ind > -1 ? this.disabledAddButtons.splice(index, 1) : 0;
    this.disabledRemoveButtons.push(index);
    this.helperService.removeItem(item);
  }

  addTocart(item : LookupItem){
    this.itemSelectEvent.emit(item.Type);
    this.helperService.addLookupItem(item);
  }
}
