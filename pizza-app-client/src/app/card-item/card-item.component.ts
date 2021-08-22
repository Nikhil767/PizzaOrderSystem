import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../interface/item';

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
  constructor() { }

  ngOnInit(): void {
  }

  incrementQuantity(itemName : any){
    alert('quantity incremented for : ' + JSON.stringify(itemName));
  }

  decrementQuantity(itemName : any){
    alert('quantity decremented for : ' + JSON.stringify(itemName));
  }

  addTocart(itemName : string){
    alert(JSON.stringify(itemName) + 'type is selected');
  }
}
