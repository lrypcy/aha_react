"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

// 路径映射配置（可扩展为独立配置文件）
const pathMap: { [key: string]: string } = {
    '/': 'Home',
    '/products': 'Products',
    '/dashboard': 'Dashboard',
    '/settings': 'Settings',
    // 添加更多路由映射...
};

export default function DynamicBreadcrumbs() {
    const pathname = usePathname();
    // ... rest of the component code remains the same ...
    const paths = pathname.split('/').filter(Boolean);

    return (
        <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                    <Link href="/" className="hover:text-blue-600 transition-colors">
                        {pathMap['/']}
                    </Link>
                </li>
                {paths.map((path, index) => {
                    const href = `/${paths.slice(0, index + 1).join('/')}`;
                    const isLast = index === paths.length - 1;

                    return (
                        <li key={href} className="flex items-center">
                            <span className="mx-2">/</span>
                            {!isLast ? (
                                <Link
                                    href={href}
                                    className="hover:text-blue-600 transition-colors capitalize"
                                >
                                    {pathMap[href] || path.replace(/-/g, ' ')}
                                </Link>
                            ) : (
                                <span
                                    className="text-gray-800 font-medium cursor-default capitalize"
                                    aria-current="page"
                                >
                                    {pathMap[href] || path.replace(/-/g, ' ')}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
} 