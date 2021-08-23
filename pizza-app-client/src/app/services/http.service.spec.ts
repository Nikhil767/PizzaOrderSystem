import { TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiResponseType } from '../interface/apiresponsetype';
import { PageResponseType } from '../interface/pageresponsetype';
import { Item } from '../interface/item';
import { OrderDTO } from '../interface/orderdto';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[
        HttpService
      ]
    });
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrive lookup size type', () => {
    const dummyData : ApiResponseType = {
      Message: "sizetype configuration loaded successfully",
      Data: [
          {
              "Id": 1,
              "Name": "Small",
              "Prize": 150,
              "Quantity": 1,
              "IsActive": true,
              "ImagePath": "../../assets/sizetype/sm-pizza.jfif",
              "PrizeUnit": "Ruppes"
          },
          {
              "Id": 2,
              "Name": "Medium",
              "Prize": 200,
              "Quantity": 1,
              "IsActive": true,
              "ImagePath": "../../assets/sizetype/m-pizza.jfif",
              "PrizeUnit": "Ruppes"
          },
          {
              "Id": 3,
              "Name": "Large",
              "Prize": 250,
              "Quantity": 1,
              "IsActive": true,
              "ImagePath": "../../assets/sizetype/lg-pizza.jfif",
              "PrizeUnit": "Ruppes"
          }
      ],
      Success: true
    }
    service.getLookupSizeType().subscribe((result : ApiResponseType) => {
      expect(dummyData.Success).toBeTruthy();
      expect(dummyData.Message).toBe('sizetype configuration loaded successfully');
      expect(dummyData.Data.length).toBe(3);
    });

    const reuqest = httpMock.expectOne(service.baseURL + 'api/Lookup/sizetype');
    expect(reuqest.request.method).toBe('GET');
    reuqest.flush(dummyData);
  });

  it('should retrive lookup sauce type', () => {
    const dummyData : ApiResponseType = {
      Message: "saucetype configuration loaded successfully",
      Data: [
          {
              "Id": 1,
              "Name": "Periperi",
              "Prize": 50,
              "Quantity": 1,
              "IsActive": true,
              "ImagePath": "../../assets/saucetype/periperi-sauce.jfif",
              "PrizeUnit": "Ruppes"
          },
          {
              "Id": 2,
              "Name": "CashewCreamy",
              "Prize": 85,
              "Quantity": 1,
              "IsActive": true,
              "ImagePath": "../../assets/saucetype/cashew-sauce.jfif",
              "PrizeUnit": "Ruppes"
          },
          {
              "Id": 3,
              "Name": "Pudina",
              "Prize": 70,
              "Quantity": 1,
              "IsActive": true,
              "ImagePath": "../../assets/saucetype/pudina-sauce.jfif",
              "PrizeUnit": "Ruppes"
          },
          {
              "Id": 4,
              "Name": "Tomatoo",
              "Prize": 60,
              "Quantity": 1,
              "IsActive": true,
              "ImagePath": "../../assets/saucetype/tomatoo-sauce.jfif",
              "PrizeUnit": "Ruppes"
          }
      ],
      Success: true
    }
    service.getLookupSauceType().subscribe((result : ApiResponseType) => {
      expect(dummyData.Success).toBeTruthy();
      expect(dummyData.Message).toBe('saucetype configuration loaded successfully');
      expect(dummyData.Data.length).toBe(4);
    });

    const reuqest = httpMock.expectOne(service.baseURL + 'api/Lookup/saucetype');
    expect(reuqest.request.method).toBe('GET');
    reuqest.flush(dummyData);
  });

  it('should retrive lookup chesse type', () => {
    const dummyData : ApiResponseType = {
      Message: "chessetype configuration loaded successfully",
      Data: [
          {
              "Id": 1,
              "Name": "NoChesse",
              "Prize": 0,
              "Quantity": 1,
              "IsActive": true,
              "ImagePath": "../../assets/chessetype/no-chesse.jfif",
              "PrizeUnit": "Ruppes"
          },
          {
              "Id": 2,
              "Name": "Chesse",
              "Prize": 50,
              "Quantity": 1,
              "IsActive": true,
              "ImagePath": "../../assets/chessetype/chesse.jfif",
              "PrizeUnit": "Ruppes"
          },
          {
              "Id": 3,
              "Name": "ExtraChesse",
              "Prize": 750,
              "Quantity": 1,
              "IsActive": true,
              "ImagePath": "../../assets/chessetype/extra-chesse.jfif",
              "PrizeUnit": "Ruppes"
          }
      ],
      Success: true
    }
    service.getLookupChesseType().subscribe((result : ApiResponseType) => {
      expect(dummyData.Success).toBeTruthy();
      expect(dummyData.Message).toBe('chessetype configuration loaded successfully');
      expect(dummyData.Data.length).toBe(3);
    });

    const reuqest = httpMock.expectOne(service.baseURL + 'api/Lookup/chessetype');
    expect(reuqest.request.method).toBe('GET');
    reuqest.flush(dummyData);
  });

  it('should retrive lookup topping type', () => {
    const dummyData : ApiResponseType = {
      Message: "toppingtype configuration loaded successfully",
      Data: [
        {
            "Id": 1,
            "Name": "Marinara",
            "Prize": 0,
            "Quantity": 1,
            "IsActive": true,
            "ImagePath": "../../assets/toppingtype/marinara.jpg",
            "PrizeUnit": "Ruppes"
        },
        {
            "Id": 2,
            "Name": "Pepperoni",
            "Prize": 75,
            "Quantity": 1,
            "IsActive": true,
            "ImagePath": "../../assets/toppingtype/peproni.jpg",
            "PrizeUnit": "Ruppes"
        },
        {
            "Id": 3,
            "Name": "Mushrooms",
            "Prize": 80,
            "Quantity": 1,
            "IsActive": true,
            "ImagePath": "../../assets/toppingtype/mushroom.jpg",
            "PrizeUnit": "Ruppes"
        },
        {
            "Id": 4,
            "Name": "Onions",
            "Prize": 50,
            "Quantity": 1,
            "IsActive": true,
            "ImagePath": "../../assets/toppingtype/onion.jpg",
            "PrizeUnit": "Ruppes"
        }
      ],
      Success: true
    }
    service.getLookupToppingType().subscribe((result : ApiResponseType) => {
      expect(dummyData.Success).toBeTruthy();
      expect(dummyData.Message).toBe('toppingtype configuration loaded successfully');
      expect(dummyData.Data.length).toBe(4);
    });

    const reuqest = httpMock.expectOne(service.baseURL + 'api/Lookup/toppingtype');
    expect(reuqest.request.method).toBe('GET');
    reuqest.flush(dummyData);
  });

  it('should retrive dashboard data', () => {
    const dummyData : PageResponseType<Item> = {
      Data: [
          {
              "IsDrink": true,
              "IsBurger": false,
              "IsPizza": false,
              "Id": 1,
              "Name": "Onion Pizza",
              "Prize": 30,
              "Quantity": 1,
              "IsActive": true,
              "ImagePath": "../../assets/dashboard/onion-pizza.jfif",
              "PrizeUnit": "Ruppes",
              "Type":'drink',
              "IsCustomPizza":false
          },
          {
              "IsDrink": true,
              "IsBurger": false,
              "IsPizza": false,
              "Id": 2,
              "Name": "Mushroom Pizza",
              "Prize": 40,
              "Quantity": 1,
              "IsActive": true,
              "ImagePath": "../../assets/dashboard/mushroom-pizza.jfif",
              "PrizeUnit": "Ruppes",
              "Type":'drink',
              "IsCustomPizza":false
          },
          {
              "IsDrink": true,
              "IsBurger": false,
              "IsPizza": false,
              "Id": 3,
              "Name": "Pepproni Pizza",
              "Prize": 50,
              "Quantity": 1,
              "IsActive": true,
              "ImagePath": "../../assets/dashboard/pepperoni-pizza.jfif",
              "PrizeUnit": "Ruppes",
              "Type":'drink',
              "IsCustomPizza":false
          },
          {
              "IsDrink": true,
              "IsBurger": false,
              "IsPizza": false,
              "Id": 4,
              "Name": "Ranch Pizza",
              "Prize": 50,
              "Quantity": 1,
              "IsActive": true,
              "ImagePath": "../../assets/dashboard/ranch-pizza.jfif",
              "PrizeUnit": "Ruppes",
              "Type":'drink',
              "IsCustomPizza":false
          },
          {
              "IsDrink": true,
              "IsBurger": false,
              "IsPizza": false,
              "Id": 5,
              "Name": "Macroni Pizza",
              "Prize": 50,
              "Quantity": 1,
              "IsActive": true,
              "ImagePath": "../../assets/dashboard/macroni-pizza.jfif",
              "PrizeUnit": "Ruppes",
              "Type":'drink',
              "IsCustomPizza":false
          },
          {
              "IsDrink": true,
              "IsBurger": false,
              "IsPizza": false,
              "Id": 6,
              "Name": "Chesse Pizza",
              "Prize": 50,
              "Quantity": 1,
              "IsActive": true,
              "ImagePath": "../../assets/dashboard/chesse-pizza.jfif",
              "PrizeUnit": "Ruppes",
              "Type":'drink',
              "IsCustomPizza":false
          },
          {
              "IsDrink": true,
              "IsBurger": false,
              "IsPizza": false,
              "Id": 7,
              "Name": "Veg Pizza",
              "Prize": 50,
              "Quantity": 1,
              "IsActive": true,
              "ImagePath": "../../assets/dashboard/veg-pizza.jfif",
              "PrizeUnit": "Ruppes",
              "Type":'drink',
              "IsCustomPizza":false
          },
          {
              "IsDrink": true,
              "IsBurger": false,
              "IsPizza": false,
              "Id": 8,
              "Name": "Pepsi",
              "Prize": 30,
              "Quantity": 1,
              "IsActive": true,
              "ImagePath": "../../assets/other/pepsi.jfif",
              "PrizeUnit": "Ruppes",
              "Type":'drink',
              "IsCustomPizza":false
          },
          {
              "IsDrink": true,
              "IsBurger": false,
              "IsPizza": false,
              "Id": 9,
              "Name": "Orange Juie",
              "Prize": 40,
              "Quantity": 1,
              "IsActive": true,
              "ImagePath": "../../assets/other/orange-juice.jfif",
              "PrizeUnit": "Ruppes",
              "Type":'drink',
              "IsCustomPizza":false
          },
          {
              "IsDrink": true,
              "IsBurger": false,
              "IsPizza": false,
              "Id": 10,
              "Name": "Coke",
              "Prize": 50,
              "Quantity": 1,
              "IsActive": true,
              "ImagePath": "../../assets/other/coke.jfif",
              "PrizeUnit": "Ruppes",
              "Type":'drink',
              "IsCustomPizza":false
          }
      ],
      PageNumber: 1,
      PageSize: 10,
      PageCount: 2,
      TotalRecords: 15,
      Message: "dashboard details loaded successfully",
      Success: true
    }
    const type = 'dashboard';
    service.getDashboardConfigs(type).subscribe((result : PageResponseType<Item>) => {
      expect(dummyData.Success).toBeTruthy();
      expect(dummyData.PageNumber).toBe(1);
      expect(dummyData.PageSize).toBe(10);
      expect(dummyData.PageCount).toBe(2);
      expect(dummyData.TotalRecords).toBe(15);
      expect(dummyData.Success).toBeTruthy();
      expect(dummyData.Message).toBe('dashboard details loaded successfully');
      expect(dummyData.Data.length).toBe(10);
    });    
    const reuqest = httpMock.expectOne(service.baseURL + 'api/Dashboard/' + type);
    expect(reuqest.request.method).toBe('GET');
    reuqest.flush(dummyData);
  });

  it('should retrive slider data', () => {
    const dummyData : PageResponseType<Item> = {
      "Data": [
        {
          "IsCustomPizza": false,
          "IsDrink": true,
          "IsBurger": false,
          "IsPizza": false,
          "Id": 1,
          "Name": "Spicy Pizza",
          "Prize": 30,
          "Type": 'slider',
          "Quantity": 1,
          "IsActive": true,
          "ImagePath": "../../assets/slider/slider1.jfif",
          "PrizeUnit": "Ruppes"
        },
        {
          "IsCustomPizza": false,
          "IsDrink": true,
          "IsBurger": false,
          "IsPizza": false,
          "Id": 2,
          "Name": "Craemy Mushroom Pizza",
          "Prize": 40,
          "Type": 'slider',
          "Quantity": 1,
          "IsActive": true,
          "ImagePath": "../../assets/slider/slider2.jfif",
          "PrizeUnit": "Ruppes"
        },
        {
          "IsCustomPizza": false,
          "IsDrink": true,
          "IsBurger": false,
          "IsPizza": false,
          "Id": 3,
          "Name": "Pepproni Pizza",
          "Prize": 50,
          "Type": 'slider',
          "Quantity": 1,
          "IsActive": true,
          "ImagePath": "../../assets/slider/slider3.jfif",
          "PrizeUnit": "Ruppes"
        },
        {
          "IsCustomPizza": false,
          "IsDrink": true,
          "IsBurger": false,
          "IsPizza": false,
          "Id": 4,
          "Name": "Extra Spicy Ranch Pizza",
          "Prize": 50,
          "Type": 'slider',
          "Quantity": 1,
          "IsActive": true,
          "ImagePath": "../../assets/slider/slider4.jfif",
          "PrizeUnit": "Ruppes"
        },
        {
          "IsCustomPizza": false,
          "IsDrink": true,
          "IsBurger": false,
          "IsPizza": false,
          "Id": 5,
          "Name": "Chessy Macroni Pizza",
          "Prize": 50,
          "Type": 'slider',
          "Quantity": 1,
          "IsActive": true,
          "ImagePath": "../../assets/slider/slider5.jfif",
          "PrizeUnit": "Ruppes"
        },
        {
          "IsCustomPizza": false,
          "IsDrink": true,
          "IsBurger": false,
          "IsPizza": false,
          "Id": 6,
          "Name": "Extra Chesse Pizza",
          "Prize": 50,
          "Type": 'slider',
          "Quantity": 1,
          "IsActive": true,
          "ImagePath": "../../assets/slider/slider6.jfif",
          "PrizeUnit": "Ruppes"
        },
        {
          "IsCustomPizza": false,
          "IsDrink": true,
          "IsBurger": false,
          "IsPizza": false,
          "Id": 7,
          "Name": "Veg Pizza",
          "Prize": 50,
          "Type": 'slider',
          "Quantity": 1,
          "IsActive": true,
          "ImagePath": "../../assets/slider/slider7.jfif",
          "PrizeUnit": "Ruppes"
        }
      ],
      PageNumber: 1,
      PageSize: 10,
      PageCount: 1,
      TotalRecords: 7,
      Message: "slider details loaded successfully",
      Success: true
    }
    const type = 'slider';
    service.getSliderConfigs(type).subscribe((result : PageResponseType<Item>) => {
      expect(dummyData.Success).toBeTruthy();
      expect(dummyData.PageNumber).toBe(1);
      expect(dummyData.PageSize).toBe(10);
      expect(dummyData.PageCount).toBe(1);
      expect(dummyData.TotalRecords).toBe(7);
      expect(dummyData.Message).toBe('slider details loaded successfully');
      expect(dummyData.Data.length).toBe(7);
    });    
    const reuqest = httpMock.expectOne(service.baseURL + 'api/Dashboard/' + type);
    expect(reuqest.request.method).toBe('GET');
    reuqest.flush(dummyData);
  });

  it('should post order', () => {
    const dummyData : ApiResponseType = {
      Data: true,
      Message: 'Order is placed successfully',
      Success: true
    }
    const payload : OrderDTO ={
      Email: "nikhildeshmukh76@gmail.com",
      Order: {
        OrderID: '1',
        TotalPrize: 100,
        PrizeUnit: "Ruppes",
        OrderItems: [
          {
                "Id": 10,
                "Name": "Chesse Pizza",
                "Prize": 100,
                "Quantity": 1,
                "IsActive": true,
                "ImagePath": '',
                "PrizeUnit": "Ruppes",
                "IsDrink": false,
                "IsBurger": false,
                "IsPizza": true,
                "IsCustomPizza": false,
              },
              {
                "Id": 11,
                "Name": "Pizza",
                "Prize": 200,
                "Quantity": 1,
                "IsActive": true,
                "ImagePath": '',
                "PrizeUnit": "Ruppes",
                "IsDrink": false,
                "IsBurger": false,
                "IsPizza": true,
                "IsCustomPizza": false,
              }
        ]
      }
    }
    service.postUserOrder(payload).subscribe((result : ApiResponseType) => {
      expect(dummyData.Success).toBeTruthy();
      expect(dummyData.Message).toBe('Order is placed successfully');
      expect(dummyData.Data).toBeTruthy();
    });    
    const reuqest = httpMock.expectOne(service.baseURL + 'api/Order');
    expect(reuqest.request.method).toBe('POST');
    reuqest.flush(dummyData);
  });

});
