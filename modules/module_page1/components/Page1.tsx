import React, { useState } from 'react';
import { Button, Input, Label } from '@pvn/formkit'; // Import gộp các component từ @pvn/formkit

// Định nghĩa kiểu dữ liệu cho state của form nếu cần, ở đây dùng tạm any
interface FormData {
    [key: string]: string;
}

const Page1: React.FC = () => {
    // State quản lý trạng thái nộp form (loading)
    const [isSubmitting, setIsSubmitting] = useState(false);
    // State quản lý thông báo sau khi nộp form
    const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error' | '', message: string }>({ type: '', message: '' });

    /**
     * Hàm xử lý sự kiện nộp form
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Bắt đầu quá trình nộp form
        setIsSubmitting(true);
        setSubmitMessage({ type: '', message: '' }); // Xóa thông báo cũ

        // Lấy dữ liệu từ form
        const formData = new FormData(e.target as HTMLFormElement);
        // Chuyển FormData thành đối tượng JavaScript
        const data: FormData = Object.fromEntries(formData.entries()) as FormData;
        
        // Log dữ liệu để kiểm tra (thay thế bằng API call thực tế)
        console.log('Login Form Submitted:', data);

        // Mô phỏng quá trình gọi API (thành công sau 1.5 giây)
        setTimeout(() => {
            setIsSubmitting(false); // Kết thúc loading
            
            // Xử lý thành công
            const successMessage = 'Đăng nhập thành công! Chuyển hướng sau giây lát...';
            setSubmitMessage({ type: 'success', message: successMessage });
            
            // Tự động xóa thông báo sau 3 giây
            setTimeout(() => setSubmitMessage({ type: '', message: '' }), 3000);
            
            // Nếu muốn mô phỏng lỗi:
            /*
            const errorMessage = 'Tài khoản hoặc mật khẩu không đúng.';
            setSubmitMessage({ type: 'error', message: errorMessage });
            */
            
        }, 1500);
    };
    
    // Định nghĩa class cho thông báo (dùng Tailwind CSS)
    const messageClass = submitMessage.type === 'success' 
        ? 'text-sm text-green-600 dark:text-green-400' 
        : 'text-sm text-red-600 dark:text-red-400';

    return (
        <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    Chào mừng trở lại 👋
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                    Vui lòng đăng nhập để tiếp tục.
                </p>
            </header>
            
            <main className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700/50">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Trường Email */}
                    <div>
                        <Label htmlFor="login-email">Địa chỉ Email</Label>
                        <Input 
                            id="login-email" 
                            name="email" 
                            type="email" 
                            placeholder="vd: you@example.com" 
                            disabled={isSubmitting} 
                            required 
                            className="mt-1 block w-full"
                        />
                    </div>
                    
                    {/* Trường Mật khẩu */}
                    <div>
                        <Label htmlFor="login-password">Mật khẩu</Label>
                        <Input 
                            id="login-password" 
                            name="password" 
                            type="password" 
                            placeholder="••••••••" 
                            disabled={isSubmitting} 
                            required 
                            className="mt-1 block w-full"
                        />
                    </div>
                    
                    {/* Footer của Form (Nút Submit và Thông báo) */}
                    <div className="pt-4 flex items-center justify-between">
                        {/* Hiển thị thông báo (thành công hoặc lỗi) */}
                        {submitMessage.message && (
                            <p className={messageClass} role="alert">
                                {submitMessage.message}
                            </p>
                        )}
                        
                        {/* Nút Đăng nhập */}
                        <Button 
                            type="submit" 
                            variant="primary" 
                            size="default" 
                            disabled={isSubmitting} 
                            // Thêm margin trái tự động nếu có thông báo
                            className={submitMessage.message ? 'ml-4' : 'ml-auto'} 
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang đăng nhập...
                                </>
                            ) : (
                                'Đăng Nhập'
                            )}
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default Page1;