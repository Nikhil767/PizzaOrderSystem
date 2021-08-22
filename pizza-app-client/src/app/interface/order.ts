import { Pizaa } from "./pizaa";

export interface Order {
    OrderID?: string;
    TotalPrize: number;
    PrizeUnit: string;
    OrderItems: Pizaa[];
    CreatedDate?: Date;
  }