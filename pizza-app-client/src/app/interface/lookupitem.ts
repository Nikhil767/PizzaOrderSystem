import { NumberFormatStyle } from "@angular/common";

export interface LookupItem {
    Id: number;
    Name: string;
    Prize: number;
    Quantity: number;
    Type?: string;
    IsActive: boolean;
    ImagePath: string;
    PrizeUnit: string;
  }