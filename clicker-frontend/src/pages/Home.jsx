import React from "react";
import { useUser } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";

export default function Home() {
    const { user, logout } = useUser();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="flex items-center justify-center p-4 min-h-[calc(100vh-64px)]">
                <Card className="p-6 w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl text-center">
                    {user ? (
                        <>
                            <h1 className="text-2xl font-bold mb-4 text-gray-900">
                                Добро пожаловать, {user.username}!
                            </h1>
                            <p className="text-gray-700 mb-6">
                                Вы успешно вошли в систему. Здесь вы можете управлять своим аккаунтом или перейти к функционалу приложения.
                            </p>
                            <Button
                                variant="danger"
                                onClick={logout}
                                className="px-6 py-2"
                            >
                                Выйти
                            </Button>
                        </>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold mb-4 text-gray-900">
                                Главная страница
                            </h1>
                            <p className="text-gray-700 mb-6">
                                Пожалуйста, войдите или зарегистрируйтесь, чтобы получить доступ к вашему аккаунту.
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button
                                    variant="primary"
                                    onClick={() => navigate("/login")}
                                >
                                    Войти
                                </Button>
                                <Button
                                    variant="success"
                                    onClick={() => navigate("/register")}
                                >
                                    Регистрация
                                </Button>
                            </div>
                        </>
                    )}
                </Card>
            </div>
        </div>
    );
}
