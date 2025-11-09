import React, { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

export default function Input({ type = "text", ...props }) {
    const [showPassword, setShowPassword] = useState(false);
    const [isCapsLock, setIsCapsLock] = useState(false);

    const handleKeyDown = (e) => {
        if (e.getModifierState && e.getModifierState("CapsLock")) setIsCapsLock(true);
    };

    const handleKeyUp = (e) => {
        if (e.getModifierState && !e.getModifierState("CapsLock")) setIsCapsLock(false);
    };

    const isPasswordType = type === "password";

    return (
        <div className="w-full relative">
            <input
                type={isPasswordType && !showPassword ? "password" : "text"}
                className="w-full border border-gray-300 p-2 pr-10 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                {...props}
            />
            {isPasswordType && (
                <div
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
                </div>
            )}
            {isCapsLock && (
                <p className="text-sm text-red-500 mt-1">Caps Lock is ON</p>
            )}
        </div>
    );
}
