import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/api.js";
import { useUser } from "../context/UserContext.jsx";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import Alert from "../components/Alert.jsx";
import Navbar from "../components/Navbar.jsx";

export default function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { setUser, setToken } = useUser();
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.username || !form.password) {
            setError("Пожалуйста, заполните все поля");
            return;
        }

        setLoading(true);
        try {
            const token = await apiFetch("/api/auth/login", { method: "POST", body: form });
            setToken(token);
            setUser({ username: form.username });
            navigate("/");
        } catch (err) {
            setError(err.message || "Ошибка входа");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar /> {/* Навбар сверху */}

            <div className="flex items-center justify-center p-4 min-h-[calc(100vh-64px)]">
                <Card className="p-6 w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
                    <h1 className="text-2xl font-bold mb-2 text-gray-900 text-center">Вход</h1>
                    <p className="text-gray-700 text-sm mb-4 text-center">
                        Введите свои данные для входа
                    </p>

                    {/* Ошибка */}
                    {error && <Alert type="error">{error}</Alert>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            name="username"
                            placeholder="Имя пользователя"
                            value={form.username}
                            onChange={handleChange}
                            error={!form.username && error ? "Обязательное поле" : ""}
                        />

                        <Input
                            name="password"
                            type="password"
                            placeholder="Пароль"
                            value={form.password}
                            onChange={handleChange}
                            error={!form.password && error ? "Обязательное поле" : ""}
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            disabled={loading}
                            loading={loading}
                        >
                            {loading ? "Вход..." : "Войти"}
                        </Button>
                    </form>

                    {/* Ссылки */}
                    <div className="mt-4 text-sm text-gray-700 text-center">
                        <span
                            className="text-emerald-400 hover:text-emerald-500 cursor-pointer transition-colors duration-200"
                            onClick={() => navigate("/register")}
                        >
                            Зарегистрироваться
                        </span>
                    </div>
                </Card>
            </div>
        </div>
    );
}
