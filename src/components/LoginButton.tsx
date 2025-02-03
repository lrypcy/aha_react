import { UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

function LoginButton() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);

    return (
        <div className="flex items-center gap-2">
            {isLoggedIn ? (
                <>
                    <UserCircleIcon className="w-6 h-6 text-gray-600" />
                    <span className="hidden sm:inline">欢迎回来</span>
                    <button
                        onClick={() => setIsLoggedIn(false)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                        退出
                    </button>
                </>
            ) : (
                <button
                    onClick={() => setShowLoginForm(!showLoginForm)}
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    <span className="hidden sm:inline">登录/注册</span>
                </button>
            )}

            {/* 保持原有的登录表单逻辑 */}
            {showLoginForm && (
                <div className="absolute top-12 right-0 bg-white p-4 rounded shadow">
                    {/* ... existing form code ... */}
                </div>
            )}
        </div>
    );
}

export default LoginButton; 