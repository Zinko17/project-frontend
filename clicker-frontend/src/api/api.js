const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export async function apiFetch(path, { method = "GET", body, headers = {} } = {}) {
    const opts = {
        method,
        headers: { "Content-Type": "application/json", ...headers },
        credentials: 'include', // обязательно для HttpOnly cookie
    };

    if (body) opts.body = JSON.stringify(body);

    const res = await fetch(`${API_BASE}${path}`, opts);
    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { data = text; }

    if (!res.ok) {
        if (data && data.error) throw new Error(data.error);
        throw new Error(typeof data === "string" ? data : res.statusText);
    }

    return data;
}
