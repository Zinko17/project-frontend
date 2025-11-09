// Card.jsx (Обновленный код)
import React from "react";

export default function Card({ children, className = "" }) {
    return (
        <div
            className={`
        bg-white shadow-md hover:shadow-xl rounded-lg p-6
        // Изменяем классы для более компактного размера
        w-full max-w-sm md:max-w-md 
        transition-shadow duration-300
        ${className}
      `}
        >
            {children}
        </div>
    );
}