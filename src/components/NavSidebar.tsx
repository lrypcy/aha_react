'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function NavSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

    const toggleItem = (href: string) => {
        setExpandedItems(prev => ({ ...prev, [href]: !prev[href] }));
    };

    const navigation = [
        { name: 'Homepage', href: '/' },
        { name: 'Dashboard', href: '/dashboard' },
        {
            name: 'Jobs',
            href: '/jobs',
            children: [
                { name: 'AJob', href: '/jobs/AJob' },
                { name: 'BJob', href: '/jobs/BJob' }
            ]
        },
        { name: 'Tasks', href: '/tasks' },
        { name: '关于', href: '/about' },
        { name: '联系我们', href: '/contact' },
    ];

    return (
        <>
            {/* Mobile menu button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 right-4 p-2 z-50 bg-white rounded-lg shadow-sm"
            >
                {isOpen ? (
                    <XMarkIcon className="w-6 h-6 text-gray-600" />
                ) : (
                    <Bars3Icon className="w-6 h-6 text-gray-600" />
                )}
            </button>

            {/* Responsive sidebar */}
            <aside
                className={`
          w-64 bg-gray-50 p-4 border-r border-gray-200
          fixed h-full transform transition-transform duration-300
          lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          z-40
        `}
            >
                <nav>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">导航</h2>
                    <ul className="space-y-2">
                        {navigation.map((item) => (
                            <li key={item.href}>
                                <div className="group relative">
                                    <div
                                        onClick={() => item.children && toggleItem(item.href)}
                                        className={`
                        flex items-center justify-between px-3 py-2 rounded transition-colors duration-200 cursor-pointer
                        ${pathname.startsWith(item.href)  // 修改匹配逻辑
                                                ? 'bg-blue-100 text-blue-600'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                            }
                    `}
                                    >
                                        {item.children ? (
                                            <>
                                                {item.name}
                                                <ChevronRightIcon className={`w-4 h-4 transition-transform ${expandedItems[item.href] ? 'rotate-90' : ''
                                                    }`} />
                                            </>
                                        ) : (
                                            <Link href={item.href} className="w-full">
                                                {item.name}
                                            </Link>
                                        )}
                                    </div>

                                    {item.children && expandedItems[item.href] && (
                                        <div className="ml-4 mt-1 space-y-1">
                                            {item.children.map(child => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className={`
                                    block px-3 py-2 rounded transition-colors duration-200
                                    ${pathname === child.href
                                                            ? 'bg-blue-50 text-blue-600'
                                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                                        }
                                `}
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
} 