import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../api/api.js';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    // Автоматическая проверка при загрузке страницы
    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await apiFetch("/api/auth/me");
                setUser({ username: data.username });
            } catch {
                setUser(null);
            }
        }
        fetchUser();
    }, []);

    const logout = async () => {
        try {
            await apiFetch("/api/auth/logout", { method: 'POST' });
        } catch (err) {
            console.error("Ошибка при logout:", err);
        }
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);
