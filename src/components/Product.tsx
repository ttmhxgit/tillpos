import React from 'react';
import { IProduct, TCustomer, TCustomerWithQuantity } from '../types'


interface IProductProps {
    product: IProduct,
    onChangeQuantityBtn: (type: 'increase' | 'decrease', index: number) => void,
    index: number
    onChangeQuantityInput: (val: string, index: number) => void,
    customer: TCustomer,
    customerQuanity: TCustomerWithQuantity
}

const Product = ({ product, onChangeQuantityBtn, index, onChangeQuantityInput, customer, customerQuanity }: IProductProps) => {
    return (
        <li className="flex items-center justify-between py-4">
            <div className="flex items-start">
                <div className="ml-4 font-semibold">
                    <p className="text-lg text-secondary">{product.name}</p>

                    <dl className="mt-1 space-y-1 text-xs text-gray-500">
                        <div>
                            <dt className="inline">Description:</dt>
                            &nbsp;
                            <dd className="inline">{product.describe}</dd>
                        </div>

                        <div>
                            <dt className="inline">Price:</dt>
                            &nbsp;
                            <dd className="inline text-base font-semibold">{product.price}</dd>
                        </div>
                    </dl>
                </div>
            </div>

            <div className="flex">
                <button id="decrease" onClick={() => { onChangeQuantityBtn('decrease', index) }} className="w-10 p-1 border-none text-lg rounded-l text-primary font-semibold bg-secondary transition-all hover:bg-secondary hover:text-primary">
                    -
                </button>

                <input
                    id={`input-${index}-${customer}`}
                    onChange={(e) => { onChangeQuantityInput(e.target.value, index)}}
                    value={customerQuanity[customer][product.size] || 0}
                    className="w-10 h-10 p-1 text-lg border-none  text-center bg-secondary text-primary"
                    type="number" min={0}
                />

                <button id="increase" onClick={() => { onChangeQuantityBtn('increase', index) }} className="w-10 p-1 border-none text-lg rounded-r text-primary font-semibold bg-secondary transition-all hover:bg-secondary hover:text-primary">
                    +
                </button>
            </div>
        </li>
    )
}

export default Product;
