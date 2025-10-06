import React, { useState } from 'react';
import { Button, Input, Label, Textarea, Select } from '@pvn/formkit';

const Sample: React.FC = () => {
    const [name, setName] = useState('Phương');
    const [note, setNote] = useState('Trang mẫu sử dụng @pvn/formkit');
    const [framework, setFramework] = useState('react');

    return (
        <div className="space-y-6">
            <header className="text-center mb-2">
                <h2 className="text-2xl font-bold">Sample Page - Demo liên kết @pvn/formkit</h2>
                <p className="text-gray-600 dark:text-gray-400">Trang demo import component từ thư viện dùng chung (cập nhật xác nhận hiển thị).</p>
            </header>

{/* Lêu lêu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập tên" />
                </div>
                <div>
                    <Label htmlFor="framework">Framework</Label>
                    <Select id="framework" value={framework} onChange={(e) => setFramework((e.target as HTMLSelectElement).value)}>
                        <option value="react">React</option>
                        <option value="vue">Vue</option>
                        <option value="svelte">Svelte</option>
                    </Select>
                </div>
            </div>

            <div>
                <Label htmlFor="note">Ghi chú</Label>
                <Textarea id="note" value={note} onChange={(e) => setNote((e.target as HTMLTextAreaElement).value)} rows={4} />
            </div>

            <div className="flex gap-3">
                <Button variant="primary">Lưu</Button>
                <Button variant="outline">Huỷ</Button>
            </div>

            <div className="mt-4 p-4 rounded border border-gray-200 dark:border-gray-700">
                <p className="text-sm">Tên: <strong>{name}</strong></p>
                <p className="text-sm">Framework: <strong>{framework}</strong></p>
                <p className="text-sm">Ghi chú: <strong>{note}</strong></p>
            </div>
        </div>
    );
};

export default Sample;


