'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {
    Drawer,
    List,
    IconButton,
    Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
    HomeIcon,
    ChartBarIcon,
    BriefcaseIcon,
    ListBulletIcon,
    InformationCircleIcon,
    PhoneIcon,
} from '@heroicons/react/24/outline';

export default function NavSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

    const toggleItem = (href: string) => {
        setExpandedItems(prev => ({ ...prev, [href]: !prev[href] }));
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const navigation = [
        { name: 'Homepage', href: '/', icon: HomeIcon },
        { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
        {
            name: 'Jobs',
            href: '/jobs',
            icon: BriefcaseIcon,
            children: [
                { name: 'AJob', href: '/jobs/AJob' },
                { name: 'BJob', href: '/jobs/BJob' }
            ]
        },
        { name: 'Tasks', href: '/tasks', icon: ListBulletIcon },
        { name: '关于', href: '/about', icon: InformationCircleIcon },
        { name: '联系我们', href: '/contact', icon: PhoneIcon },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: isOpen ? 240 : 64,
                flexShrink: 0,
                transition: 'width 0.3s',
                '& .MuiDrawer-paper': {
                    width: isOpen ? 240 : 64,
                    boxSizing: 'border-box',
                    transition: 'width 0.3s',
                    overflowX: 'hidden',
                    marginTop: '64px',
                    height: 'calc(100% - 64px)'
                },
            }}
        >
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px' }}>
                <IconButton onClick={toggleSidebar}>
                    {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
                </IconButton>
            </div>
            <List>
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
                                    <div className="flex items-center">
                                        {item.children ? (
                                            <item.icon
                                                className="w-5 h-5 flex-shrink-0"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    toggleItem(item.href);
                                                }}
                                            />
                                        ) : (
                                            <Link href={item.href}>
                                                <item.icon className="w-5 h-5 flex-shrink-0 cursor-pointer" />
                                            </Link>
                                        )}
                                        {isOpen && (
                                            <span className="ml-3">
                                                {item.children ? item.name : (
                                                    <Link href={item.href} className="w-full">
                                                        {item.name}
                                                    </Link>
                                                )}
                                            </span>
                                        )}
                                    </div>
                                    {item.children && isOpen && (
                                        <ChevronRightIcon className={`w-4 h-4 transition-transform ${expandedItems[item.href] ? 'rotate-90' : ''}`} />
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
            </List>
        </Drawer>
    );
} 