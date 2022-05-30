import React from "react";
import TotalCheckoutModal from "../components/TotalCheckoutModal";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, ShallowWrapper, configure } from "enzyme";
import { DefaultRule } from "../constants";
import { TCustomerWithQuantity } from '../types';

const customerQuanity: TCustomerWithQuantity = {
    default: {
        small: 0,
        medium: 0,
        large: 0,
    },
    amazon: {
        small: 0,
        medium: 0,
        large: 3,
    },
    microsoft: {
        small: 3,
        medium: 0,
        large: 0
    },
    facebook: {
        small: 0,
        medium: 5,
        large: 0,
    },
}

configure({ adapter: new Adapter() });


describe('Checkout', () => {
    let wrapper: ShallowWrapper;
    let mockprops: any
    beforeEach(() => {
        mockprops = {
            onClose: () => { },
            isOpen: true,
            customerWithQuanity: customerQuanity,
            rules: DefaultRule,
        }
        wrapper = shallow(<TotalCheckoutModal {...mockprops} />);

    });

    it("should render correctly", () => expect(wrapper).toMatchSnapshot());

    it("render product list", () => {
        expect(wrapper.find('#price').text()).toBe("147.91");
    });
});