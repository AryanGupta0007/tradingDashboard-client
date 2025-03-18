import React, { useContext, useEffect, useState, useRef } from "react";
import { TableContext } from "../contexts/TableContext";
import { FormContext } from "../contexts/FormContext";

export const DropWithSearch = (props) => {
    const { symbols } = useContext(TableContext);
    const { formState, updateFormState } = useContext(FormContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Filter symbols based on input value
    const filteredSymbols = symbols.filter((e) =>
        formState.symbol ? e.toUpperCase().startsWith(formState.symbol.toUpperCase()) : true
    );

    // Handle input change
    const onChange = (e) => {
        const { value } = e.target;
        updateFormState("symbol", value);
        setIsDropdownOpen(true);
    };

    // Handle selection
    const onSelectSymbol = (symbol) => {
        updateFormState("symbol", symbol);
        setIsDropdownOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative w-60  p-2">
            {/* Input Field */}
            <input
                type="text"
                placeholder="Enter symbol..."
                value={formState.symbol || ""}
                name="symbol"
                onChange={onChange}
                style={{font: "5px", height: "30px", width: "110px", padding: "2px", position: "relative", bottom: "1px"}}
                onFocus={() => setIsDropdownOpen(true)}
                className=" border border-gray-400  outline-none"
            />

            {/* Dropdown */}
            {isDropdownOpen && filteredSymbols.length > 0 && (
                <ul
                    className="absolute left-0  mt-1 bg-white border border-gray-400 rounded-md shadow-lg max-h-40 overflow-y-auto z-50 thin-scrollbar"
                >
                    {filteredSymbols.map((symbol, index) => (
                        <li
                            key={index}
                            onClick={() => onSelectSymbol(symbol)}
                            style={{height: "20px", width: "110px", position: "relative", bottom: "4px"}}
                            className="cursor-pointer hover:bg-gray-200"
                        >
                            {symbol}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

