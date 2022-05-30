import { ISelect } from "./Select"

export type TProductSize = 'small' | 'medium' | 'large'

export interface IProduct {
    price: number
    name: string
    describe: string
    size: TProductSize
}

export interface IItemAdd {
    id: number;
    item: any
}
export interface IItemProduct extends IItemAdd{
    count: number;
}

export interface IItemsCheckout {
    vendor: string;
    items: Array<IItemProduct>;
}

export interface IDiscountResult {
    totalAmount: number;
    price: number;
    percent: number;
}

export interface IPizzaSelect extends ISelect {
    size?: TProductSize
}