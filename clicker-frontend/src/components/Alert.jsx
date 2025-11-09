import React from "react";

export default function Alert({ type = "error", children }) {
    const variants = {
        error: "bg-red-100 border border-red-400 text-red-700",
        success: "bg-green-100 border border-green-400 text-green-700",
        info: "bg-yellow-100 border border-yellow-300 text-gray-900",
    };

    return (
        <div className={`${variants[type]} px-4 py-2 rounded mb-4 min-h-[40px] flex items-center`}>
            {children}
        </div>
    );
}
