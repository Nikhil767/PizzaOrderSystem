import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderDTO } from '../interface/orderdto';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseURL : string =  environment.BaseURL;
  constructor(private http: HttpClient) { }

  getLookupSizeType() {
    return this.http.get<any>(this.baseURL + 'api/Lookup/sizetype');
  }

  getLookupSauceType() {
    return this.http.get<any>(this.baseURL + 'api/Lookup/saucetype');
  }

  getLookupChesseType() {
    return this.http.get<any>(this.baseURL + 'api/Lookup/chessetype');
  }

  getLookupToppingType() {
    return this.http.get<any>(this.baseURL + 'api/Lookup/toppingtype');
  }

  getDashboardConfigs(type: string) {
    return this.http.get<any>(this.baseURL + 'api/Dashboard/' + type);
  }

  getSliderConfigs(type: string) {
    return this.http.get<any>(this.baseURL + 'api/Dashboard/' + type);
  }

  postUserOrder(payload : OrderDTO) {
    return this.http.post<any>(this.baseURL + 'api/Order', payload);
  }
}
