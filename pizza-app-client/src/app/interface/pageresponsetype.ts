export interface PageResponseType<T> {
    Message: string;
    Data: T[];
    Success: boolean;
    PageNumber: number;
    PageSize: number;
    PageCount: number;
    TotalRecords: number;
  }