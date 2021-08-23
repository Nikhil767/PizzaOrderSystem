import { Item } from "./item";

export interface Order {
    OrderID?: string;
    TotalPrize: number;
    PrizeUnit: string;
    OrderItems: Item[];
    CreatedDate?: Date;
  }