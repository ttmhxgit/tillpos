export interface IRule {
    itemType: {
        customer: string,
        operator: string,
        amount: number,
        product: string
    },
    discountType: {
        productDiscountType: string,
        amount: number,
        price: number,
        percent: number
    }
}