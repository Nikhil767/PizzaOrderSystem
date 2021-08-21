import { LookupItem } from "./lookupitem";

export interface Item extends LookupItem {
    IsDrink: boolean;
    IsBurger: boolean;
    IsPizza: boolean;
  }