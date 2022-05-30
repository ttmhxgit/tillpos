import React from "react";
import Product from "../components/Product";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, ShallowWrapper, configure, mount, ReactWrapper } from "enzyme";
import { TCustomer, TCustomerWithQuantity } from "../types";
import { Products, InitCustomerWithQuanity } from "../constants";


configure({ adapter: new Adapter() });

const testProps = {
    product: Products[0],
    onChangeQuantityBtn: (type: 'increase' | 'decrease', index: number) => { },
    index: 0,
    onChangeQuantityInput: (val: string, index: number) => { },
    customer: 'default' as TCustomer,
    customerQuanity: InitCustomerWithQuanity
}

describe('Checkout', () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
        wrapper = shallow(<Product {...testProps} />);
    });

    it("should render correctly", () => {
        expect(wrapper).toMatchSnapshot()
    });


    it("increase 1 item", () => {
        const mockOnchange = jest.fn()
        wrapper = shallow(<Product {...testProps} onChangeQuantityBtn={mockOnchange} />);

        const incButton = wrapper.find("#increase");

        incButton.simulate('click', 'increase', testProps.index);

        wrapper.update();
        expect(mockOnchange).toHaveBeenCalledWith('increase', testProps.index);
    });


    it("decrease 1 item", () => {
        const mockOnchange = jest.fn()
        wrapper = shallow(<Product {...testProps} onChangeQuantityBtn={mockOnchange} />);

        const incButton = wrapper.find("#decrease");

        incButton.simulate('click', 'decrease', testProps.index);

        wrapper.update();
        expect(mockOnchange).toHaveBeenCalledWith('decrease', testProps.index);
    });


    it("change quantity item", () => {
        const mockOnchange = jest.fn()
        wrapper = shallow(<Product {...testProps} onChangeQuantityInput={mockOnchange} />);

        const input = wrapper.find(`#input-${testProps.index}-${testProps.customer}`);

        input.simulate('change', { target: { value: 123 } }, testProps.index)

        wrapper.update();
        expect(mockOnchange).toHaveBeenCalledWith(123, 0);
    });
});
