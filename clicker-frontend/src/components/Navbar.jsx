import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-50">
            {/* Логотип / Название приложения */}
            <div
                className="text-xl font-bold text-gray-800 cursor-pointer hover:text-emerald-500 transition-colors"
                onClick={() => navigate("/")}
            >
                MyApp
            </div>

            {/* Ссылки */}
            <div className="space-x-4">
                <span
                    className="text-gray-700 hover:text-emerald-500 cursor-pointer transition-colors"
                    onClick={() => navigate("/")}
                >
                    Главная
                </span>
                <span
                    className="text-gray-700 hover:text-emerald-500 cursor-pointer transition-colors"
                    onClick={() => navigate("/help")}
                >
                    Помощь
                </span>
            </div>
        </nav>
    );
}
