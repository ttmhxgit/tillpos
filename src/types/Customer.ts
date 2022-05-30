import { TProductSize } from "./Product";

export type TCustomer = 'default' | 'amazon' | 'microsoft' | 'facebook';

export interface ICustomer {
    text: string
    value: TCustomer
};


export type TCustomerWithQuantity = {
    [customer in TCustomer]: {
        [product in TProductSize]: number
    }
}