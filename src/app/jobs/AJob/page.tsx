'use client'
import JobSearch from '../../../components/JobSearch';
import JobsTable from '../../../components/JobsTable';
import { useState } from 'react';

// 示例数据 - 需要替换为实际搜索结果数据
const sampleJobs = Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    title: ['前端工程师', '后端开发', '全栈开发', 'UI设计师', '测试工程师', '运维工程师'][i % 6],
    company: ['科技公司', '数据公司', '云服务', '互联网集团', '数字科技', '创新企业'][i % 6],
    location: ['北京', '上海', '广州', '深圳', '杭州', '成都'][i % 6],
    salary: ['20-30k', '25-35k', '30-40k', '18-25k', '28-38k', '22-32k'][i % 6]
}));

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>(sampleJobs);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (searchParams: SearchParams) => {
        setIsLoading(true);
        try {
            // 这里替换为实际API调用
            const response = await fetch('/api/internal/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(searchParams)
            });
            const data = await response.json();
            setJobs(data);
        } catch (error) {
            console.error('搜索失败:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Jobs</h1>
            <JobSearch onSearch={handleSearch} />

            <div className="mt-4">
                {isLoading ? (
                    <div>加载中...</div>
                ) : (
                    <JobsTable jobs={jobs} />
                )}
            </div>
        </div>
    );
} 