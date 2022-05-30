import React, { useRef, useState } from 'react'
import Select from '../components/Select';
import Product from '../components/Product';
import TotalCheckoutModal from '../components/TotalCheckoutModal';
import AddRuleModal from '../components/RuleModal';

import { TCustomerWithQuantity, TCustomer, IProduct, IRule } from '../types';
import { Products, Customers, DefaultRule, PizzaSelect, ProductDiscountType, OperatorSelect } from '../constants';

const initCustomerWithQuanity: TCustomerWithQuantity = {
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

const Checkout = () => {
    const [customerWithQuanity, setCustomerWithQuanity] = useState<TCustomerWithQuantity>(initCustomerWithQuanity);
    const [customer, setCustomer] = useState<TCustomer>('default');
    const [isShowPopupCheckout, setIsShowPopupCheckout] = useState<boolean>(false);
    const [isShowPopupAddRule, setIsShowPopupAddRule] = useState<boolean>(false);
    const [rules, setRules] = useState<IRule[]>(DefaultRule);
    const currentIndex = useRef<number>(-1);
    const ruleEdit = useRef<IRule | undefined>(undefined);


    const handleChangeCustomer = (val: TCustomer) => {
        setCustomer(val)
    }

    const togglePopupCheckout = () => {
        setIsShowPopupCheckout(!isShowPopupCheckout);
    }

    const handleClearCart = () => {
        setCustomerWithQuanity(initCustomerWithQuanity);
    }

    const togglePopupAddRule = () => {
        if (isShowPopupAddRule) {
            ruleEdit.current = undefined;
            currentIndex.current = -1;
        }
        setIsShowPopupAddRule(!isShowPopupAddRule);
    }


    const handleChangeQuantityBtn = (type: 'increase' | 'decrease', index: number): void => {
        const product: IProduct | undefined = Products.find((_, ind) => index === ind)
        if (!product) return;
        if (type === 'increase') {
            setCustomerWithQuanity((prev) => {
                const newState = Object.assign({}, {
                    ...prev,
                    [customer]: {
                        ...customerWithQuanity[customer],
                        [product.size]: customerWithQuanity[customer][product.size] + 1
                    }
                })
                return newState;
            })
        }

        if (type === 'decrease' && customerWithQuanity[customer][product.size] === 0) return;

        if (type === 'decrease') {
            setCustomerWithQuanity((prev) => {
                const newState = Object.assign({}, {
                    ...prev,
                    [customer]: {
                        ...customerWithQuanity[customer],
                        [product.size]: customerWithQuanity[customer][product.size] - 1
                    }
                })
                return newState;
            });
        }
    }

    const handleChangeQuantityInput = (val: string, index: number) => {
        const product: IProduct | undefined = Products.find((_, ind) => index === ind)
        if (!product) return;

        setCustomerWithQuanity((prev) => {
            const newState = Object.assign({}, {
                ...prev,
                [customer]: {
                    ...customerWithQuanity[customer],
                    [product.size]: parseFloat(val)
                }
            })
            return newState;
        })
    }

    const handleSaveRule = (ruleData: IRule) => {
        const rule = { ...ruleData };
        if (currentIndex.current === -1) {
            rules.push(rule);
        } else {
            rules[currentIndex.current] = ruleData;
        }
        setRules(rules)

        ruleEdit.current = undefined;
        currentIndex.current = -1;
    }

    const mapDiscountResult = (ruleData: IRule): string => {
        let str = "";
        if (ruleData.discountType.price) {
            str = `with the price of ${ruleData.discountType.price}`;
        } else if (ruleData.discountType.percent) {
            str = `with ${ruleData.discountType.percent} percent`;
        }
        if (ruleData.discountType.amount) {
            let temp = `in ${ruleData.itemType.amount} on ${ruleData.discountType.amount}`;
            str = str === "" ? temp : `${str} and ${temp}`;
        }
        return str;
    }


    const mapRuleType = (ruleData: IRule): string => {
        const ruleType = ruleData.discountType.productDiscountType;
        if (ruleType === ProductDiscountType.ALL.value) {
            return `whole cart`;
        } else if (ruleType === ProductDiscountType.EACH.value) {
            return `each`;
        } else return "";
    }



    const mapOperator = (ruleData: IRule): string => {
        switch (ruleData.itemType.operator) {
            case OperatorSelect.EQUAL.value:
                return ``;
            case OperatorSelect.GREATER_OR_EQUAL_THAN.value:
                return `at least`;
            case OperatorSelect.GREATER_THAN.value:
                return `more than`;
            case OperatorSelect.LESS_OR_EQUAL_THAN.value:
                return `less or equal than`;
            case OperatorSelect.LESS_THAN.value:
                return `less than`;
            default:
                return ``;
        }
    }

    const mapDiscountMessage = (ruleData: IRule): string => {
        return `${Customers.find((vendor) => vendor.value === ruleData.itemType.customer)
            ?.text
            } - Gets a discount ${mapDiscountResult(
                ruleData
            )} on ${mapRuleType(ruleData)} for buy ${PizzaSelect.find((pizza) => pizza.value === ruleData.itemType.product)
                ?.text
            } ${ruleData.discountType.productDiscountType ===
                ProductDiscountType.EACH.value
                ? ""
                : `with ${mapOperator(ruleData)} ${ruleData.itemType.amount
                } item(s)`
            }`;
    }

    const handleEditRule = (index: number): void => {
        currentIndex.current = index;
        ruleEdit.current = rules[index]
        setIsShowPopupAddRule(true);
    }

    const handleRemoveRule = (index: number): void => {
        setRules(prev => {
            const newRule = [...prev];
            newRule.splice(index, 1);
            return newRule
        });
    }

    return (
        <div>
            <div className="relative mx-auto max-w-screen-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 h-[calc(100vh_-_92px)]">
                    <div className="py-8 bg-primary md:py-24">
                        <div className="max-w-lg px-4 mx-auto lg:px-8">
                            <div className="flow-root">
                                <ul className="-my-4 divide-y divide-gray-200">
                                    {Products.map((item, index) => (
                                        <Product
                                            key={index}
                                            product={item}
                                            index={index}
                                            onChangeQuantityBtn={handleChangeQuantityBtn}
                                            onChangeQuantityInput={handleChangeQuantityInput}
                                            customer={customer}
                                            customerQuanity={customerWithQuanity}
                                        />
                                    ))}
                                </ul>
                            </div>
                            <div className="flex justify-between mt-10">
                                <button onClick={togglePopupCheckout} className="py-2 px-4 border-none text-lg rounded text-primary font-semibold bg-secondary transition-all hover:bg-secondary hover:text-primary">
                                    Checkout
                                </button>
                                <button onClick={handleClearCart} className="py-2 px-4 border-none text-lg rounded text-primary font-semibold bg-secondary transition-all hover:bg-secondary hover:text-primary">
                                    Clear cart
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="py-8 bg-white md:py-24">
                        <div className="max-w-lg px-4 mx-auto lg:px-8">
                            <div className="flex flex-col justify-center">
                                <Select options={Customers} onChange={handleChangeCustomer} label="Customer" value={customer} />
                                <div>
                                    <label className="font-semibold text-lg">Rule:</label>
                                    <ul className="mb-4 h-84 overflow-y-auto  divide-y divide-gray-200">
                                        {/* filter(item => item.itemType.customer === customer). */}
                                        {rules.map((rule, index) => (
                                            <li className="py-4 flex flex-wrap" key={`${index}-${rule.itemType.customer}`}>
                                                <div className="w-10/12 ">
                                                    {mapDiscountMessage(rule)}
                                                </div>
                                                <div className="items-center overflow-hidden text-white rounded">
                                                    <button onClick={() => { handleEditRule(index) }} className="p-1 border-none text-lg rounded text-secondary font-semibold bg-primary transition-all hover:bg-secondary hover:text-primary">
                                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                    </button>

                                                    <button onClick={() => { handleRemoveRule(index) }} className="p-1 border-none text-lg rounded text-secondary font-semibold bg-primary transition-all hover:bg-secondary hover:text-primary">
                                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <button onClick={togglePopupAddRule} className="mr-auto mt-8 py-2 px-4 border-none text-lg rounded text-secondary font-semibold bg-primary transition-all hover:bg-secondary hover:text-primary">
                                Add rule
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <TotalCheckoutModal rules={rules} customerWithQuanity={customerWithQuanity} onClose={togglePopupCheckout} isOpen={isShowPopupCheckout} />
            <AddRuleModal ruleEdit={ruleEdit.current} onSaveRule={handleSaveRule} onClose={togglePopupAddRule} isOpen={isShowPopupAddRule} />
        </div>
    )
}


export default Checkout;
