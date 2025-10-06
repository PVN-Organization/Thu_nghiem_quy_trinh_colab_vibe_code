import React, { useMemo, useState } from 'react';
import { Button, Input, Label, Select } from '@pvn/formkit';

type Metric = { id: string; label: string; value: number; trend: 'up' | 'down' | 'flat' };

const sampleMetrics: Metric[] = [
    { id: 'users', label: 'Active Users', value: 1280, trend: 'up' },
    { id: 'orders', label: 'Orders Today', value: 312, trend: 'flat' },
    { id: 'errors', label: 'Errors', value: 7, trend: 'down' }
];

const Dashboard: React.FC = () => {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const metrics = useMemo(() => {
        return sampleMetrics
            .filter(m => (filter === 'all' ? true : m.trend === (filter as Metric['trend'])))
            .filter(m => m.label.toLowerCase().includes(search.toLowerCase()));
    }, [filter, search]);

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <div className="flex items-end gap-3">
                    <div>
                        <Label htmlFor="search">Tìm kiếm</Label>
                        <Input id="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Nhập từ khoá..." />
                    </div>
                    <div>
                        <Label htmlFor="trend">Xu hướng</Label>
                        <Select id="trend" value={filter} onChange={e => setFilter((e.target as HTMLSelectElement).value)}>
                            <option value="all">Tất cả</option>
                            <option value="up">Tăng</option>
                            <option value="down">Giảm</option>
                            <option value="flat">Ổn định</option>
                        </Select>
                    </div>
                    <Button variant="primary">Làm mới</Button>
                </div>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {metrics.map(m => (
                    <div key={m.id} className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white/50 dark:bg-gray-800/50">
                        <div className="text-sm text-gray-500 dark:text-gray-400">{m.label}</div>
                        <div className="text-3xl font-semibold mt-1">{m.value.toLocaleString()}</div>
                        <div className="mt-2 text-xs">
                            {m.trend === 'up' && <span className="text-green-600">▲ Tăng</span>}
                            {m.trend === 'down' && <span className="text-red-600">▼ Giảm</span>}
                            {m.trend === 'flat' && <span className="text-gray-500">■ Ổn định</span>}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Dashboard;


