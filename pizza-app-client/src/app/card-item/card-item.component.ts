import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../interface/item';
import { LookupItem } from '../interface/lookupitem';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {

  @Input() type : string = '';
  @Input() cardItem : any;
  @Input() showAddToCart : boolean = false;  
  @Output() itemSelectEvent = new EventEmitter<string>();
  constructor(private helperService : HelperService) { }

  ngOnInit(): void {
  }

  incrementQuantity(item : Item){
    this.helperService.addItem(item);
  }

  decrementQuantity(item : Item){
    this.helperService.removeItem(item);
  }

  addTocart(item : LookupItem){
    this.itemSelectEvent.emit(item.Type);
    this.helperService.addLookupItem(item);
  }
}
