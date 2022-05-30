import React from "react";
import Product from "../components/Product";
import Adapter from 'enzyme-adapter-react-16';
import Checkout from "../pages/Checkout";
import { shallow, ShallowWrapper, configure } from "enzyme";
import { Products } from "../constants";
import { TCustomerWithQuantity, TCustomer } from '../types';
// const items: Array<IItemAdd> = [
//     {
//         id: 0,
//         item: {
//             name: "Small Pizza",
//             description: "10'' pizza for one person",
//             price: 11.99
//         }
//     },
//     {
//         id: 1,
//         item: {
//             name: "Medium Pizza",
//             description: "12'' pizza for two person",
//             price: 15.99
//         }
//     },
//     {
//         id: 2,
//         item: {
//             name: "Large Pizza",
//             description: "15'' pizza for four person",
//             price: 21.99
//         }
//     }
// ];

// const vendors: Array<string> = ["microsoft", "default", "facebook"];

// interface IItemCase {
//     id: number;
//     count: number;
// }
// const cases = [
//     {
//         vendor: "default",
//         items: [
//             { id: 0, count: 1 },
//             { id: 1, count: 1 },
//             { id: 2, count: 1 }
//         ]
//     },
//     {
//         vendor: "microsoft",
//         items: [
//             { id: 0, count: 3 },
//             { id: 2, count: 1 }
//         ]
//     },
//     {
//         vendor: "amazon",
//         items: [
//             { id: 1, count: 3 },
//             { id: 2, count: 1 }
//         ]
//     }
// ];


const customerQuanity: TCustomerWithQuantity = {
    default: {
        small: 0,
        medium: 0,
        large: 0
    },
    amazon: {
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

configure({ adapter: new Adapter() });

describe('Checkout', () => {
    let wrapper: ShallowWrapper;
    let productWrapper: ShallowWrapper;
    let productProps: any
    beforeEach(() => {
        wrapper = shallow(<Checkout />);

        productProps = {
            product: Products[0],
            customerQuanity: customerQuanity,
            onChangeQuantityBtn: (type: 'increase' | 'decrease', index: number) => { customerQuanity.default.small = type ==='increase' ?  customerQuanity.default.small + 1 : customerQuanity.default.small - 1},
            onChangeQuantityInput: (val: string, index: number) => { customerQuanity.default.small = parseFloat(val) },
            customer: 'default' as TCustomer,
            index: 0,
        }
        
        productWrapper = shallow(
            <Product {...productProps} />
        );
    });

    it("should render correctly", () => expect(wrapper).toMatchSnapshot());

    it("render product list", () => {
        expect(wrapper.find(Product).length).toBe(Products.length);
    });

    it("product list increase item", () => {
        const incButton = productWrapper.find("#increase");
        incButton.simulate('click', 'increase', 0);
        productWrapper.setProps({...productProps, customerQuanity: customerQuanity })
        productWrapper.update()
        expect(productWrapper.find(`#input-0-default`).props().value).toEqual(1);
    })


    it("product list decrease  item", () => {
        const incButton = productWrapper.find("#decrease");
        incButton.simulate('click', 'decrease', 0);
        productWrapper.setProps({...productProps, customerQuanity: customerQuanity })
        productWrapper.update()
        expect(productWrapper.find(`#input-0-default`).props().value).toEqual(0);
    })


    it("product list change  item", () => {
        const input = productWrapper.find(`#input-${productProps.index}-${productProps.customer}`);
        input.simulate('change', { target: { value: 123 } }, productProps.index)
        productWrapper.setProps({...productProps, customerQuanity: customerQuanity })
        productWrapper.update()
        expect(productWrapper.find(`#input-0-default`).props().value).toEqual(123);

    })
});