'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
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
    ChatBubbleLeftIcon,
    DocumentIcon,
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
                { name: 'AJob', href: '/jobs/AJob', icon: DocumentIcon }
            ]
        },
        { name: 'Tasks', href: '/tasks', icon: ListBulletIcon },
        { name: 'Chat', href: '/chat', icon: ChatBubbleLeftIcon },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: isOpen ? 240 : 64,
                flexShrink: 0,
                transition: 'width 0.3s',
                '& .MuiDrawer-paper': {
                    background: `
                        linear-gradient(
                            195deg,
                            rgba(245, 247, 255, 0.98) 0%,
                            rgba(240, 242, 254, 0.98) 50%,
                            rgba(235, 238, 252, 0.98) 100%
                        )`,
                    backdropFilter: 'blur(16px)',
                    boxShadow: '4px 0 20px -5px rgba(102, 126, 255, 0.15)',
                    width: isOpen ? 240 : 64,
                    boxSizing: 'border-box',
                    transition: 'width 0.3s, background 0.3s',
                    overflowX: 'hidden',
                    marginTop: '64px',
                    height: 'calc(100% - 64px)',
                    borderRight: 'none'
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
                        flex items-center justify-between px-3 py-2 rounded-lg 
                        transition-all duration-300 ease-out
                        ${pathname.startsWith(item.href)
                            ? 'bg-white text-indigo-600 shadow-md hover:shadow-lg'
                            : 'text-slate-600 hover:bg-white/60 hover:text-indigo-500'
                        }
                        hover:transform hover:scale-[1.02]
                    `}
                                >
                                    <div className="flex items-center">
                                        {item.children ? (
                                            <item.icon
                                                className="w-5 h-5 flex-shrink-0 cursor-pointer"
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
                                    <div className={`${isOpen ? 'ml-4' : 'ml-0'} mt-1 space-y-1`}>
                                        {item.children.map(child => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (!isOpen) toggleSidebar();
                                                }}
                                                className={`
                                    flex items-center px-3 py-2 rounded transition-colors duration-200
                                    ${pathname === child.href
                                                            ? 'bg-blue-50 text-blue-600'
                                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                                        }
                                    ${isOpen ? 'pl-3' : 'pl-1 justify-center'}
                                `}
                                            >
                                                <child.icon className="w-5 h-5 flex-shrink-0" />
                                                {isOpen && <span className="ml-2">{child.name}</span>}
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