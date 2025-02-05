import { UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useState, useEffect, useRef } from 'react';

function LoginButton() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    // 添加表单引用
    const formRef = useRef<HTMLDivElement>(null);

    // 添加点击外部检测逻辑
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showLoginForm && formRef.current && !formRef.current.contains(event.target as Node)) {
                setShowLoginForm(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showLoginForm]); // 依赖项中添加 showLoginForm

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // 这里添加实际登录逻辑
        if (credentials.username && credentials.password) {
            setIsLoggedIn(true);
            setShowLoginForm(false);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setShowLoginForm(false);
    };

    return (
        <div className="relative flex items-center gap-2">
            {isLoggedIn ? (
                <div className="group relative">
                    <button className="flex items-center gap-1">
                        <UserCircleIcon className="w-6 h-6 text-gray-600" />
                        <span className="hidden sm:inline">欢迎回来</span>
                    </button>

                    {/* 用户信息下拉菜单 */}
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                            <p>用户名：{credentials.username}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                        >
                            退出登录
                        </button>
                    </div>
                </div>
            ) : (
                    <>
                        <button
                            onClick={() => setShowLoginForm(!showLoginForm)}
                            className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                        >
                            <ArrowRightOnRectangleIcon className="w-5 h-5" />
                            <span className="hidden sm:inline">登录/注册</span>
                        </button>

                        {/* 登录表单弹窗 */}
                        {showLoginForm && (
                            <div
                                ref={formRef} // 绑定 ref 到表单容器
                                className="absolute top-12 right-0 bg-white p-6 rounded-lg shadow-xl w-80 space-y-4"
                            >
                                <h3 className="text-xl font-semibold text-gray-800">用户登录</h3>
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            用户名
                                        </label>
                                        <input
                                            type="text"
                                            value={credentials.username}
                                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            密码
                                        </label>
                                        <input
                                            type="password"
                                            value={credentials.password}
                                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        立即登录
                                    </button>
                                </form>
                                <div className="text-sm text-gray-500 text-center">
                                    没有账号？ <button className="text-blue-600 hover:underline">立即注册</button>
                                </div>
                            </div>
                        )}
                    </>
            )}
        </div>
    );
}

export default LoginButton; 