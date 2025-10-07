import React, { useState } from 'react';
import { Button } from '@pvn/formkit';
import { Input } from '@pvn/formkit';
import { Label } from '@pvn/formkit';

const Login: React.FC = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [loginMessage, setLoginMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setLoginData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setLoginMessage('');

        // Demo login logic
        setTimeout(() => {
            if (loginData.username === 'admin' && loginData.password === 'password') {
                setIsLoggedIn(true);
                setLoginMessage('Đăng nhập thành công!');
            } else {
                setLoginMessage('Tên đăng nhập hoặc mật khẩu không đúng!');
            }
            setIsLoggingIn(false);
        }, 1500);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setLoginData({ username: '', password: '' });
        setLoginMessage('');
    };

    if (isLoggedIn) {
        return (
            <>
                <header className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white tracking-tight">Đăng nhập thành công</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Chào mừng bạn đã đăng nhập vào hệ thống!</p>
                </header>
                <main className="bg-white dark:bg-gray-800/50 rounded-lg shadow-2xl p-8 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                    <div className="text-center space-y-6">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                            <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Xin chào, {loginData.username}!</h2>
                        <p className="text-gray-600 dark:text-gray-400">Bạn đã đăng nhập thành công vào hệ thống.</p>
                        <div className="pt-6">
                            <Button variant="outline" onClick={handleLogout} size="lg">
                                Đăng xuất
                            </Button>
                        </div>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <header className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white tracking-tight">Đăng nhập hệ thống</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Vui lòng nhập thông tin đăng nhập của bạn.</p>
            </header>
            <main className="bg-white dark:bg-gray-800/50 rounded-lg shadow-2xl p-8 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="username">Tên đăng nhập</Label>
                        <Input 
                            id="username" 
                            type="text" 
                            placeholder="Nhập tên đăng nhập" 
                            value={loginData.username} 
                            onChange={handleChange} 
                            disabled={isLoggingIn}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="password">Mật khẩu</Label>
                        <Input 
                            id="password" 
                            type="password" 
                            placeholder="Nhập mật khẩu" 
                            value={loginData.password} 
                            onChange={handleChange} 
                            disabled={isLoggingIn}
                            required
                        />
                    </div>

                    {loginMessage && (
                        <div className={`p-4 rounded-lg ${
                            loginMessage.includes('thành công') 
                                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                        }`}>
                            <p className="text-sm font-medium">{loginMessage}</p>
                        </div>
                    )}

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                <p>Demo: username = "admin", password = "password"</p>
                            </div>
                            <div className="flex gap-4 ml-auto">
                                <Button type="button" variant="outline" size="default" disabled={isLoggingIn}>
                                    Hủy
                                </Button>
                                <Button type="submit" variant="primary" size="default" disabled={isLoggingIn}>
                                    {isLoggingIn ? 'Đang đăng nhập...' : 'Đăng nhập'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </>
    );
};

export default Login;
