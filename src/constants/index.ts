import { IProduct, ICustomer, IRule, ISelectCondition, ISelect, IProductDiscountType, IPizzaSelect, TCustomerWithQuantity } from "../types";
import { toSnakeCase } from '../helpers'

export const Products: IProduct[] = [
    {
        name: "Small Pizza",
        price: 11.99,
        describe: "10'' pizza for one person",
        size: "small",
    }, {
        name: "Medium Pizza",
        price: 15.99,
        describe: "12'' pizza for two persons",
        size: "medium",
    }, {
        name: "Large Pizza",
        price: 21.99,
        describe: "15'' pizza for four persons",
        size: 'large',
    }
]

export const Customers: ICustomer[] = [
    {
        text: "Default",
        value: "default"
    }, {
        text: "Amazon",
        value: "amazon"
    }, {
        text: "Microsoft",
        value: "microsoft"
    }, {
        text: "Facebook",
        value: "facebook"
    },
]

export const DefaultRule: Array<IRule> = [
    {
        itemType: {
            customer: "microsoft",
            operator: "greater_or_equal_than",
            amount: 3,
            product: "small_pizza"
        },
        discountType: {
            productDiscountType: "each",
            amount: 2,
            price: 0,
            percent: 0
        }
    },
    {
        itemType: {
            customer: "amazon",
            operator: "greater_or_equal_than",
            amount: 1,
            product: "large_pizza"
        },
        discountType: {
            productDiscountType: "each",
            amount: 1,
            price: 19.99,
            percent: 0
        }
    },
    {
        itemType: {
            customer: "facebook",
            operator: "greater_or_equal_than",
            amount: 5,
            product: "medium_pizza"
        },
        discountType: {
            productDiscountType: "each",
            amount: 4,
            price: 0,
            percent: 0
        }
    }
];




export const OperatorSelect: ISelectCondition = {
    GREATER_OR_EQUAL_THAN: {
        text: "Greater or equal than",
        value: toSnakeCase("Greater or equal than")
    },
    GREATER_THAN: {
        text: "Greater than",
        value: toSnakeCase("Greater than")
    },
    EQUAL: {
        text: "Equal than",
        value: toSnakeCase("Equal than")
    },
    LESS_THAN: {
        text: "Less than",
        value: toSnakeCase("Less than")
    },
    LESS_OR_EQUAL_THAN: {
        text: "Less or equal than",
        value: toSnakeCase("Less or equal than")
    }
};


export const PizzaSelect: Array<IPizzaSelect> = (function () {
    const data: Array<IPizzaSelect> = Products.map((data) => {
        const formatData: IPizzaSelect = {
            text: data.name,
            value: toSnakeCase(data.name),
            size: data.size,
        };
        return formatData;
    });
    const additionalData: ISelect = {
        text: "Anything",
        value: "anything",
    };
    data.push(additionalData);
    return data;
})();


export const ProductDiscountType: IProductDiscountType = {
    ALL: {
        text: "All",
        value: "all"
    },
    EACH: {
        text: "Each",
        value: "each"
    }
};

export const InitCustomerWithQuanity: TCustomerWithQuantity = {
    amazon: {
        small: 0,
        medium: 0,
        large: 0
    },
    default: {
        small: 0,
        medium: 0,
        large: 0
    },
    microsoft: {
        small: 0,
        medium: 0,
        large: 0
    },
    facebook: {
        small: 0,
        medium: 0,
        large: 0
    },
}