import React, { MouseEvent } from "react";

interface IHeaderProps {
    onSwitchTheme: (e: MouseEvent<HTMLButtonElement>) => void
}

const Header = ({ onSwitchTheme }: IHeaderProps) => {
    return (
        <header className="bg-primary">
            <div className="max-w-screen-xl px-4 py-4 mx-auto sm:py-6 sm:px-3 lg:px-8">
                <div className="sm:justify-between sm:items-center sm:flex">
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl cursor-pointer font-bold sm:text-3xl text-indigo-light">
                            Till
                        </h1>
                    </div>

                    <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:mt-0 sm:items-center">

                        <button
                            className="block px-5 py-3 text-sm font-medium text-indigo-dark font-semibold transition bg-indigo-light rounded-lg hover:font-bold focus:outline-none focus:ring"
                            type="button"
                            onClick={onSwitchTheme}
                        >
                            Switch Theme
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
