import React, { useEffect, useMemo, useRef, useState } from 'react';
import Modal from 'react-modal';
import { OperatorSelect, PizzaSelect, ProductDiscountType, Products } from '../constants';
import { IRule, TCustomerWithQuantity, IDiscountResult, TCustomer, TProductSize, IProduct } from '../types';

interface ITotalCheckoutPopupProps {
    onClose: () => void
    isOpen: boolean
    customerWithQuanity: TCustomerWithQuantity
    rules: IRule[]
}

const TotalCheckoutModal = ({ onClose, isOpen, customerWithQuanity, rules }: ITotalCheckoutPopupProps) => {

    const [totalPrice, setTotalPrice] = useState<number>(0);
    const prices = useRef<number[]>([]);

    const filteredCustomer = useMemo<TCustomerWithQuantity>(() => {
        const customers = Object.keys(customerWithQuanity) as TCustomer[];
        const cloned = { ...customerWithQuanity };
        customers.forEach(item => {
            if (customerWithQuanity[item].large === 0 && customerWithQuanity[item].medium === 0 && customerWithQuanity[item].small === 0) {
                delete cloned[item];
            }
        })
        return cloned;
    }, [customerWithQuanity]);

    const applyRule = (quantityCheck: number, itemToCheck: IProduct, discount: IDiscountResult) => {
        const totalAmount = discount.totalAmount || quantityCheck;
        const price = discount.price || itemToCheck.price;
        const percent = discount.percent || 100;
        prices.current.push(totalAmount * price * (percent / 100));
    }

    const analyzeRule = (items: TCustomerWithQuantity, size: TProductSize, rules: IRule[]) => {
        const customersWithQuan = Object.keys(items) as TCustomer[];

        for (let i = 0; i < customersWithQuan.length; i++) {
            const productRules = rules.filter((rule) => PizzaSelect.find((pizza) => pizza.value === rule.itemType.product)?.size === size || rule.itemType.product === "anything");
            const itemToCheck = Products.find(item => item.size === size);

            if (!itemToCheck) return;
            const quantityCheck = items[customersWithQuan[i]][size];
            const discount: IDiscountResult = {
                totalAmount: 0,
                price: 0,
                percent: 0
            };
            for (let j = 0; j < productRules.length; j++) {
                const productRule = productRules[j];
                const discountType = productRule.discountType.productDiscountType;
                if (discountType === ProductDiscountType.ALL.value) {
                    if (checkCondition(quantityCheck, productRule)) {
                        discount.percent = productRule.discountType.percent || 0;
                        discount.price = productRule.discountType.price || 0;
                    }
                } else if (discountType === ProductDiscountType.EACH.value) {
                    if (quantityCheck) {
                        discount.totalAmount =
                            productRule.discountType.amount *
                            Math.floor(quantityCheck / productRule.itemType.amount) +
                            (quantityCheck % productRule.itemType.amount);
                        if (productRule.discountType.price) {
                            const normalPrice = itemToCheck.price;
                            const avgPrice =
                                (Math.floor(quantityCheck / productRule.itemType.amount) *
                                    productRule.itemType.amount *
                                    productRule.discountType.price +
                                    (quantityCheck % productRule.itemType.amount) *
                                    normalPrice) /
                                quantityCheck;
                            discount.price = avgPrice || 0;
                        }
                        if (productRule.discountType.percent) {
                            const normalPercent = 100;
                            const avgPercent =
                                (Math.floor(quantityCheck / productRule.itemType.amount) *
                                    productRule.itemType.amount *
                                    productRule.discountType.percent +
                                    (quantityCheck % productRule.itemType.amount) *
                                    normalPercent) /
                                quantityCheck;
                            discount.percent = avgPercent;
                        }
                    }
                }
            }
            applyRule(quantityCheck, itemToCheck, discount);
        }
    }

    const calculatePrice = (): number => {
        prices.current = [];
        const customers = Object.keys(filteredCustomer) as TCustomer[];
        customers.forEach((cus) => {
            const customerRules = rules.filter(
                (rule) => rule.itemType.customer === cus
            );
            const sizes = Object.keys(filteredCustomer[cus]) as TProductSize[];
            sizes.forEach((size) => {
                if (filteredCustomer[cus][size] > 0) {
                    analyzeRule(filteredCustomer, size, customerRules);
                }
            })
        })
        return prices.current.length > 0 ? prices.current.reduce((a, b) => a + b) : 0;
    }

    useEffect(() => {
        if (isOpen) {
            const price = calculatePrice();
            setTotalPrice(price);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const checkCondition = (count: number, rule: IRule) => {
        if (count)
            switch (rule.itemType.operator) {
                case OperatorSelect.EQUAL.value:
                    return count === rule.itemType.amount;
                case OperatorSelect.GREATER_OR_EQUAL_THAN.value:
                    return count >= rule.itemType.amount;
                case OperatorSelect.GREATER_THAN.value:
                    return count > rule.itemType.amount;
                case OperatorSelect.LESS_OR_EQUAL_THAN.value:
                    return count <= rule.itemType.amount;
                case OperatorSelect.LESS_THAN.value:
                    return count < rule.itemType.amount;
            }
        else return false;
    }

    return (
        <Modal ariaHideApp={false} isOpen={isOpen} style={{}} className="h-fit w-fit m-auto inset-12 bg-primary overflow-auto rounded outline-none">
            <div className="w-128">
                <div
                    className="modal-header flex flex-shrink-0 items-center justify-between p-6 border-b border-gray-200 rounded-t-md">
                    <h2 className="text-xl text-secondary font-semibold text-lg">
                        Checkout Total
                    </h2>
                    <button className="inline-block" onClick={onClose}>
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="close-icon text-secondary fill-current">
                            <path data-v-6a943414="" d="M6.414 5A1 1 0 105 6.414L10.586 12 5 17.586A1 1 0 106.414 19L12 13.414 17.586 19A1 1 0 1019 17.586L13.414 12 19 6.414A1 1 0 1017.586 5L12 10.586 6.414 5z"></path>
                        </svg>
                    </button>
                </div>
                <div className="modal-body relative p-12">
                    {Object.keys(filteredCustomer).map((item) => (
                        <details className="group mb-2" key={item}>
                            <summary
                                className="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-secondary"
                            >
                                <h5 className="font-medium font-bold capitalize">
                                    {item}
                                </h5>

                                <svg
                                    className="flex-shrink-0 ml-1.5 w-5 h-5 transition duration-300 group-open:-rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </summary>

                            <div className="bg-secondary overflow-hidden overflow-x-auto border border-gray-100 rounded">
                                <table className="min-w-full text-sm divide-y divide-gray-200">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">Name</th>
                                            <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">Price</th>
                                            <th className="px-4 py-2 text-center font-medium text-left text-gray-900 whitespace-nowrap">Amount</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100">
                                        {Products.map((pro, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">{pro.name}</td>
                                                <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{pro.price}</td>
                                                <td className="px-4 text-center py-2 text-gray-700 whitespace-nowrap">{filteredCustomer[item as TCustomer][pro.size]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </details>
                    ))}

                    <h4 className="mr-auto mt-8 text-lg text-secondary font-bold">
                        Total: <span id="price">{totalPrice}</span>
                    </h4>
                </div>
            </div>
        </Modal>
    )
}

export default TotalCheckoutModal;
