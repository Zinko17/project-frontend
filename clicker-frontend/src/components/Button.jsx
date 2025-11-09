import React from "react";

export default function Button({ children, variant = "primary", onClick, className = "" }) {
    const base = "font-bold py-2 px-4 rounded shadow-md transition-transform transform hover:scale-105";
    const variants = {
        primary: "bg-emerald-400 hover:bg-emerald-500 text-white",
        secondary: "bg-rose-300 hover:bg-rose-400 text-white",
        accent: "bg-yellow-300 hover:bg-yellow-400 text-gray-900",
    };
    return (
        <button className={`${base} ${variants[variant]} ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}
