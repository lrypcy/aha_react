'use client'

import { useState } from 'react';
import { Line, Column } from '@ant-design/charts';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('data');

    const dashboards = [
        {
            key: 'data',
            label: '数据看板',
            items: [
                {
                    title: '用户增长趋势',
                    chart: <Line data={[
                        { month: 'Jan', users: 100 },
                        { month: 'Feb', users: 200 },
                        { month: 'Mar', users: 300 },
                    ]} xField="month" yField="users" />
                },
                {
                    title: '销售额统计',
                    chart: <Column data={[
                        { category: 'A', sales: 50 },
                        { category: 'B', sales: 80 },
                        { category: 'C', sales: 120 },
                    ]} xField="category" yField="sales" />
                }
            ]
        },
        {
            key: 'monitor',
            label: '监控看板',
            items: [
                {
                    title: '系统负载',
                    chart: <Line data={[
                        { time: '09:00', load: 30 },
                        { time: '12:00', load: 50 },
                        { time: '15:00', load: 45 },
                    ]} xField="time" yField="load" />
                },
                {
                    title: '错误日志',
                    chart: <Column data={[
                        { type: '404', count: 12 },
                        { type: '500', count: 5 },
                        { type: 'Timeout', count: 8 },
                    ]} xField="type" yField="count" />
                }
            ]
        }
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>

            <div className="flex gap-4 my-4 border-b">
                {dashboards.map(db => (
                    <button
                        key={db.key}
                        onClick={() => setActiveTab(db.key)}
                        className={`px-4 py-2 ${activeTab === db.key
                                ? 'border-b-2 border-blue-500 text-blue-600'
                                : 'text-gray-500 hover:text-blue-500'
                            }`}
                    >
                        {db.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboards
                    .find(db => db.key === activeTab)
                    ?.items.map((item, index) => (
                        <div key={index} className="p-4 bg-white rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                            <div className="h-64">
                                {item.chart}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
} 