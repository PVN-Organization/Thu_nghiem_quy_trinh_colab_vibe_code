import React, { useState } from 'react';
import { Button } from '@pvn/formkit';
import { Input } from '@pvn/formkit';
import { Label } from '@pvn/formkit';

const Page1: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');
        
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        console.log('Login Form Submitted:', data);

        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitMessage('Successfully logged in!');
            setTimeout(() => setSubmitMessage(''), 3000);
        }, 1500);
    };

    return (
        <>
            <header className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white tracking-tight">Login</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Access your account.</p>
            </header>
            <main className="bg-white dark:bg-gray-800/50 rounded-lg shadow-2xl p-8 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="login-email">Email Address</Label>
                        <Input id="login-email" name="email" type="email" placeholder="you@example.com" disabled={isSubmitting} required />
                    </div>
                    <div>
                        <Label htmlFor="login-password">Password</Label>
                        <Input id="login-password" name="password" type="password" placeholder="••••••••" disabled={isSubmitting} required />
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <div className="flex items-center justify-between">
                            {submitMessage && (
                                <p className="text-sm text-green-600 dark:text-green-400">{submitMessage}</p>
                            )}
                            <Button type="submit" variant="primary" size="default" disabled={isSubmitting} className="ml-auto">
                               {isSubmitting ? 'Logging In...' : 'Log In'}
                            </Button>
                        </div>
                    </div>
                </form>
            </main>
        </>
    );
};

export default Page1;