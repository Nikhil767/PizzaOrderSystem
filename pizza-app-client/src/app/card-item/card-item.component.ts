import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../interface/item';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {

  @Input() cardItem : any;
  @Input() showAddToCart : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  incrementQuantity(itemName : string){
    alert('quantity incremented for : ' + itemName);
  }

  decrementQuantity(itemName : string){
    alert('quantity decremented for : ' + itemName);
  }

  addTocart(itemName : string){
    alert(itemName + 'type is selected');
  }
}
