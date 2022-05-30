import React, { MouseEvent, useState } from 'react';
import Header from './components/Header';

import Checkout from './pages/Checkout';
import './App.css';

function App() {
    const [theme, setTheme] = useState("dark");
    
    const handleSwitchTheme = (e: MouseEvent<HTMLButtonElement>):void => {
        e.preventDefault();
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div data-theme={theme}>
            <Header onSwitchTheme={handleSwitchTheme} />
            <div className="min-h-full">
                <Checkout />
            </div>
        </div>
    );
}

export default App;