import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomType } from '../interface/customtype';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-custom-pizza',
  templateUrl: './custom-pizza.component.html',
  styleUrls: ['./custom-pizza.component.css']
})
export class CustomPizzaComponent {

  sizeTypeSelected : boolean = false;
  sauceTypeSelected : boolean = false;
  chesseTypeSelected : boolean = false;
  toppingTypeSelected : boolean = false;

  sizeTypes : any;
  sauceTypes : any;
  chesseTypes : any;
  toppingTypes : any;
  subscription: Subscription[] = [];
  constructor(private httpService : HttpService) { 
    this.getSizeTypes();
    this.getSauceTypes();
    this.getChesseTypes();
    this.getToppingTypes();
  }

  getSizeTypes(){
    this.subscription.push(this.httpService.getLookupSizeType().subscribe(x => 
      {
        if(x){
          this.sizeTypes = x.Data
        }
      }));
  }

  getSauceTypes(){
    this.subscription.push(this.httpService.getLookupSauceType().subscribe(x => 
      {
        if(x){
          this.sauceTypes = x.Data
        }
      }));
  }

  getChesseTypes(){
    this.subscription.push(this.httpService.getLookupChesseType().subscribe(x => 
      {
        if(x){
          this.chesseTypes = x.Data
        }
      }));
  }

  getToppingTypes(){
    this.subscription.push(this.httpService.getLookupToppingType().subscribe(x => 
      {
        if(x){
          this.toppingTypes = x.Data
        }
      }));
  }

  itemSelected(newItem: string) {
    switch(newItem){
      case CustomType.sizetype.toString() :
        this.sizeTypeSelected = true;
        break;
      case CustomType.saucetype.toString() :
        this.sauceTypeSelected = true;
        break;
      case CustomType.chessetype.toString() :
        this.chesseTypeSelected = true;
        break;
      case CustomType.toppingtype.toString() :
        this.toppingTypeSelected = true;
        break;
    }
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.forEach(x=> x.unsubscribe());
    }
  }

}
