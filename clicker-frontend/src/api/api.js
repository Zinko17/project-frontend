// src/api/api.js
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export async function apiFetch(path, { method = "GET", body, token, headers = {} } = {}) {
    const opts = {
        method,
        headers: { "Content-Type": "application/json", ...headers },
    };
    if (token) opts.headers['Authorization'] = `Bearer ${token}`;
    if (body) opts.body = JSON.stringify(body);

    try {
        const res = await fetch(`${API_BASE}${path}`, opts);

        const text = await res.text();

        // Попытка распарсить JSON, если сервер возвращает { error: "..." }
        let data;
        try { data = JSON.parse(text); } catch { data = text; }

        if (!res.ok) {
            // Если сервер возвращает объект с полем error
            if (data && data.error) throw new Error(data.error);
            // Иначе — текст ответа
            throw new Error(typeof data === "string" ? data : res.statusText);
        }

        return typeof data === "string" ? data : data;
    } catch (err) {
        // Если сеть не доступна или fetch упал
        if (err instanceof TypeError) throw new Error("Сервер недоступен");
        throw err;
    }
}
