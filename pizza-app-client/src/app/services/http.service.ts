import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponseType } from '../interface/apiresponsetype';
import { Item } from '../interface/item';
import { LookupItem } from '../interface/lookupitem';
import { OrderDTO } from '../interface/orderdto';
import { PageResponseType } from '../interface/pageresponsetype';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseURL : string =  environment.BaseURL;
  constructor(private http: HttpClient) { }

  getLookupSizeType() {
    return this.http.get<ApiResponseType>(this.baseURL + 'api/Lookup/sizetype');
  }

  getLookupSauceType() {
    return this.http.get<ApiResponseType>(this.baseURL + 'api/Lookup/saucetype');
  }

  getLookupChesseType() {
    return this.http.get<ApiResponseType>(this.baseURL + 'api/Lookup/chessetype');
  }

  getLookupToppingType() {
    return this.http.get<ApiResponseType>(this.baseURL + 'api/Lookup/toppingtype');
  }

  getDashboardConfigs(type: string) {
    return this.http.get<PageResponseType<Item>>(this.baseURL + 'api/Dashboard/' + type);
  }

  getSliderConfigs(type: string) {
    return this.http.get<PageResponseType<Item>>(this.baseURL + 'api/Dashboard/' + type);
  }

  postUserOrder(payload : OrderDTO) {
    return this.http.post<ApiResponseType>(this.baseURL + 'api/Order', payload);
  }
}
