import React from 'react';
import { ISelect }from '../types';

interface ISelectProps {
    options: ISelect[],
    value: number | string,
    label: string,
    onChange: (val: any) => void
}

const Select = ({ options, value, label, onChange }: ISelectProps ) => {
    return (
        <div className="mb-3">
        <label className="font-semibold text-lg">{label}:</label>
        <select className="form-select appearance-none
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example"
            onChange={e => onChange(e.target.value)}
            value={value}
        >
            {options.map((item: ISelect) => (
                <option key={item.value} value={item.value}>{item.text}</option>
            ))}
        </select>
    </div>
    )
}

export default Select;
