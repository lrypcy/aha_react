'use client';

import Link from 'next/link';
import LoginButton from './LoginButton';

export default function TopNavbar() {
    return (
        <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 backdrop-blur-md bg-white/30">
                <div className="flex items-center justify-between h-16">
                    {/* 左侧留空保持布局平衡 */}
                    <div className="flex-1"></div>

                    {/* 右侧内容 */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/docs"
                            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            {/* ... existing svg ... */}
                            文档
                        </Link>
                        
                        <div className="relative">
                            {/* 这里可以添加搜索框 */}
                        </div>
                        
                        <div>
                            <LoginButton />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
} 