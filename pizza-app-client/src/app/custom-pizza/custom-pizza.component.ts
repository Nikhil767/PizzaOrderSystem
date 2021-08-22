import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-custom-pizza',
  templateUrl: './custom-pizza.component.html',
  styleUrls: ['./custom-pizza.component.css']
})
export class CustomPizzaComponent implements OnInit {

  sizeTypeSelected : boolean = false;
  sauceTypeSelected : boolean = false;
  chesseTypeSelected : boolean = false;
  toppingTypeSelected : boolean = false;

  sizeTypes : any;
  sauceTypes : any;
  chesseTypes : any;
  toppingTypes : any;
  constructor(private httpService : HttpService) { 
    this.getSizeTypes();
    this.getSauceTypes();
    this.getChesseTypes();
    this.getToppingTypes();
  }

  getSizeTypes(){
    this.httpService.getLookupSizeType().subscribe(x => 
      {
        if(x){
          this.sizeTypes = x.Data
        }
        console.log(x)
      });
  }

  getSauceTypes(){
    this.httpService.getLookupSauceType().subscribe(x => 
      {
        if(x){
          this.sauceTypes = x.Data
        }
        console.log(x)
      });
  }

  getChesseTypes(){
    this.httpService.getLookupChesseType().subscribe(x => 
      {
        if(x){
          this.chesseTypes = x.Data
        }
        console.log(x)
      });
  }

  getToppingTypes(){
    this.httpService.getLookupToppingType().subscribe(x => 
      {
        if(x){
          this.toppingTypes = x.Data
        }
        console.log(x)
      });
  }

  itemSelected(newItem: string) {
    alert(newItem);
  }

  ngOnInit(): void {
  }

}
