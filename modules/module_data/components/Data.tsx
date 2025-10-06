import React, { useState } from 'react';
import { Button } from '@pvn/formkit';

type User = {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
};

const Data: React.FC = () => {
    const [users, setUsers] = useState<User[]>([
        { id: 1, name: 'Nguyễn Văn A', email: 'a.nguyen@example.com', address: 'Hà Nội', phone: '0912345678' },
        { id: 2, name: 'Trần Thị B', email: 'b.tran@example.com', address: 'Hồ Chí Minh', phone: '0987654321' },
        { id: 3, name: 'Lê Văn C', email: 'c.le@example.com', address: 'Đà Nẵng', phone: '0901122334' },
        { id: 4, name: 'Phạm Thị D', email: 'd.pham@example.com', address: 'Cần Thơ', phone: '0933445566' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newPhone, setNewPhone] = useState('');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setNewName('');
        setNewEmail('');
        setNewAddress('');
        setNewPhone('');
    };

    const handleAddUser = (e?: React.FormEvent) => {
        e?.preventDefault();
        // simple validation
        if (!newName.trim() || !newEmail.trim()) {
            alert('Vui lòng nhập ít nhất tên và email');
            return;
        }

        const maxId = users.reduce((max, u) => Math.max(max, u.id), 0);
        const next: User = {
            id: maxId + 1,
            name: newName.trim(),
            email: newEmail.trim(),
            address: newAddress.trim(),
            phone: newPhone.trim(),
        };

        setUsers(prev => [...prev, next]);
        closeModal();
    };

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Danh sách người dùng (Sample)</h2>
                <Button type="button" variant="primary" onClick={openModal}>Thêm người dùng</Button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Tên</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Địa chỉ</th>
                            <th className="px-4 py-2 border">Số điện thoại</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id} className="odd:bg-white even:bg-gray-50">
                                <td className="px-4 py-2 border">{u.id}</td>
                                <td className="px-4 py-2 border">{u.name}</td>
                                <td className="px-4 py-2 border">{u.email}</td>
                                <td className="px-4 py-2 border">{u.address}</td>
                                <td className="px-4 py-2 border">{u.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40" onClick={closeModal} />
                    <div className="relative bg-white w-full max-w-lg rounded shadow-lg p-6 z-10">
                        <h3 className="text-lg font-medium mb-4">Thêm người dùng mới</h3>
                        <form onSubmit={handleAddUser} className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium">Tên</label>
                                <input value={newName} onChange={e => setNewName(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Email</label>
                                <input value={newEmail} onChange={e => setNewEmail(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Địa chỉ</label>
                                <input value={newAddress} onChange={e => setNewAddress(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Số điện thoại</label>
                                <input value={newPhone} onChange={e => setNewPhone(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
                            </div>
                            <div className="flex justify-end gap-3 pt-3">
                                <button type="button" className="px-4 py-2 border rounded" onClick={closeModal}>Hủy</button>
                                <Button type="submit" variant="primary">Thêm</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Data;