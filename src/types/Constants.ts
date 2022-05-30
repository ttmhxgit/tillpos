import { ISelect } from "./Select";

export interface ISelectCondition {
  GREATER_THAN: ISelect;
  GREATER_OR_EQUAL_THAN: ISelect;
  EQUAL: ISelect;
  LESS_THAN: ISelect;
  LESS_OR_EQUAL_THAN: ISelect;
}

export interface IProductDiscountType {
  EACH: ISelect;
  ALL: ISelect;
}