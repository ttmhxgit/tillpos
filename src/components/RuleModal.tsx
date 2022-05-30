import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import Select from './Select';

import { Customers, OperatorSelect, PizzaSelect, ProductDiscountType } from '../constants';
import { ISelect, IRule } from '../types';


interface IAddRulePopupProps {
    onClose: () => void
    isOpen: boolean
    onSaveRule: (data: IRule) => void;
    ruleEdit?: IRule
}

const OperatorConditionSelect: Array<ISelect> = Object.values(OperatorSelect);
const ProductDiscountTypeSelect: Array<ISelect> = Object.values(ProductDiscountType);

const DefaultRule: IRule = {
    itemType: {
        customer: Customers[0].value,
        operator: OperatorConditionSelect[0].value,
        amount: 0,
        product: PizzaSelect[0].value
    },
    discountType: {
        productDiscountType: ProductDiscountTypeSelect[0].value,
        amount: 0,
        price: 0,
        percent: 0
    }
};


    const validateField = (fieldName: string, value: any) => {
        if (fieldName === "percent") {
            value = Math.max(0, Math.min(100, value));
        }
        return value;
    }

const AddRuleModal = ({ onClose, isOpen, onSaveRule, ruleEdit }: IAddRulePopupProps) => {
    const [ruleData, setRuleData] = useState<IRule>(DefaultRule);

    useEffect(() => {
        if (ruleEdit && isOpen) {
            setRuleData(ruleEdit)
        }
    }, [isOpen, ruleEdit]);

    const updateRuleData = (parent: 'itemType' | 'discountType', fieldName: string, value: any) => {
        const val = validateField(fieldName, value);

        setRuleData((prev) => {
            const newState = Object.assign({}, {
                ...prev,
                [parent]: {
                    ...ruleData[parent],
                    [fieldName]: val
                }
            });
            return newState;
        });
    }

    const reset = (): void => {
        setRuleData(DefaultRule);
    }

    const onRuleAdd = () => {
        const rule = JSON.parse(JSON.stringify(ruleData));
        onSaveRule(rule);
        onClose();
        reset();
    }

    const handleClose = () => {
        onClose();
        reset();
    }

    return (
        <Modal ariaHideApp={false} isOpen={isOpen} style={{}} className="h-fit w-fit m-auto inset-12 bg-secondary overflow-auto rounded outline-none border border-gray-200">
            <div
                className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                <h2 className="text-xl font-semibold leading-normal text-primary text-2xl">
                    Add rule
                </h2>
                <button className="inline-block" onClick={handleClose}>
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="close-icon">
                        <path data-v-6a943414="" d="M6.414 5A1 1 0 105 6.414L10.586 12 5 17.586A1 1 0 106.414 19L12 13.414 17.586 19A1 1 0 1019 17.586L13.414 12 19 6.414A1 1 0 1017.586 5L12 10.586 6.414 5z"></path>
                    </svg>
                </button>
            </div>
            <div
                className="relative w-screen max-w-lg mx-auto divide-y divide-gray-100 rounded-lg shadow-2xl"
            >
                <main className="flow-root p-6">
                    <div className="-my-8 divide-y divide-gray-100">
                        <div className="py-6">
                            <fieldset>
                                <legend className="text-lg font-medium">Item Type</legend>
                                <div className="flex justify-center flex-wrap h-fit g-6">
                                    <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0 mr-4">
                                        <Select
                                            options={Customers}
                                            onChange={customer => updateRuleData('itemType', 'customer', customer)}
                                            label="Customer"
                                            value={ruleData.itemType.customer}
                                        />
                                        <Select
                                            options={OperatorConditionSelect}
                                            onChange={operator => updateRuleData('itemType', 'operator', operator)}
                                            label="Operator"
                                            value={ruleData.itemType.operator}
                                        />
                                    </div>
                                    <div className="md:w-8/12 lg:w-5/12 ml-4">
                                        <Select
                                            options={PizzaSelect}
                                            onChange={pizza => updateRuleData('itemType', 'product', pizza)}
                                            label="Product"
                                            value={ruleData.itemType.product}
                                        />
                                        <div className="flex flex-col">
                                            <label>Amount:</label>
                                            <input
                                                onChange={e => updateRuleData('itemType', 'amount', e.target.value)}
                                                value={ruleData.itemType.amount}
                                                className="w-full border border-solid border-gray-300 rounded p-2 text-sm text-center"
                                                type="number"
                                                min={0}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>

                        <div className="py-6">
                            <fieldset>
                                <legend className="text-lg font-medium">Discount Type</legend>

                                <div className="flex justify-center flex-wrap h-fit g-6">
                                    <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0 mr-4">
                                        <Select
                                            options={ProductDiscountTypeSelect}
                                            onChange={dicountType => updateRuleData('discountType', 'productDiscountType', dicountType)}
                                            label="Product"
                                            value={ruleData.discountType.productDiscountType}
                                        />
                                        <div className="flex flex-col">
                                            <label>Amount:</label>
                                            <input
                                                onChange={e => updateRuleData('discountType', 'amount', e.target.value)}
                                                value={ruleData.discountType.amount}
                                                className="w-full border border-solid border-gray-300 rounded p-2 text-sm text-center"
                                                type="number"
                                                min={0}
                                                disabled={ruleData.discountType.productDiscountType === ProductDiscountType.ALL.value}
                                            />
                                        </div>
                                    </div>
                                    <div className="md:w-8/12 lg:w-5/12 ml-4">
                                        <div className="flex flex-col mb-3">
                                            <label>Price:</label>
                                            <input
                                                onChange={e => updateRuleData('discountType', 'price', e.target.value)}
                                                value={ruleData.discountType.price}
                                                className="w-full border border-solid border-gray-300 rounded p-2 text-sm text-center"
                                                type="number" min={0}
                                                disabled={!!ruleData.discountType.percent}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label>Percent:</label>
                                            <input
                                                onChange={e => updateRuleData('discountType', 'percent', e.target.value)}
                                                value={ruleData.discountType.percent}
                                                className="w-full border border-solid border-gray-300 rounded p-2 text-sm text-center"
                                                type="number"
                                                min={0}
                                                max={100}
                                                disabled={!!ruleData.discountType.price}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </main>

                <footer className="flex items-center justify-between p-3">
                    <div>
                        <button onClick={reset} className="block text-sm font-medium text-gray-600 underline" type="button">Clear all</button>
                    </div>

                    <div>
                        <button onClick={onRuleAdd} className="block mr-auto py-2 px-4 border-none text-lg rounded text-secondary font-semibold bg-primary transition-all hover:bg-secondary hover:text-primary">
                            Save
                        </button>
                    </div>
                </footer>
            </div>
        </Modal>
    )
}

export default AddRuleModal;
