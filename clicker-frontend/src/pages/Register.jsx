import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/api.js";
import { useUser } from "../context/UserContext.jsx";
import Navbar from "../components/Navbar.jsx";
import Card from "../components/Card.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import Alert from "../components/Alert.jsx";

export default function Register() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { setUser, setToken } = useUser();
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Проверка пароля
        if (form.password !== form.confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }

        setLoading(true);
        try {
            const token = await apiFetch("/api/auth/register", { method: "POST", body: form });
            setToken(token);
            setUser({ username: form.username });
            navigate("/"); // после успешной регистрации — на главную
        } catch (err) {
            setError(err.message || "Ошибка регистрации");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar /> {/* Навбар сверху */}

            <div className="flex items-center justify-center p-4 min-h-[calc(100vh-64px)]">
                <Card className="p-6 w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
                    <h1 className="text-2xl font-bold mb-2 text-gray-900 text-center">Регистрация</h1>
                    <p className="text-gray-700 text-sm mb-4 text-center">
                        Создайте новый аккаунт
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
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            error={!form.email && error ? "Обязательное поле" : ""}
                        />
                        <Input
                            name="password"
                            type="password"
                            placeholder="Пароль"
                            value={form.password}
                            onChange={handleChange}
                            error={!form.password && error ? "Обязательное поле" : ""}
                        />
                        <Input
                            name="confirmPassword"
                            type="password"
                            placeholder="Подтвердите пароль"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            error={!form.confirmPassword && error ? "Обязательное поле" : ""}
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            disabled={loading}
                            loading={loading}
                        >
                            {loading ? "Регистрация..." : "Зарегистрироваться"}
                        </Button>
                    </form>

                    <div className="mt-4 text-sm text-gray-700 text-center">
                        <span
                            className="text-emerald-400 hover:text-emerald-500 cursor-pointer transition-colors duration-200"
                            onClick={() => navigate("/login")}
                        >
                            Уже есть аккаунт? Войти
                        </span>
                    </div>
                </Card>
            </div>
        </div>
    );
}
