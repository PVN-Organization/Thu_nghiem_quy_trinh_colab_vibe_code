import React, { useState } from 'react';
import { Button } from '@pvn/formkit';
import { Input } from '@pvn/formkit';
import { Label } from '@pvn/formkit';
import { Select } from '@pvn/formkit';

const Data: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        console.log('Settings Form Submitted:', data);

        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitMessage('Settings saved successfully!');
            setTimeout(() => setSubmitMessage(''), 3000);
        }, 1500);
    };

    return (
        <>
            <header className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white tracking-tight">User Settings</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Manage your account preferences.</p>
            </header>
            <main className="bg-white dark:bg-gray-800/50 rounded-lg shadow-2xl p-8 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" name="username" type="text" defaultValue="jane_doe" disabled={isSubmitting} />
                    </div>
                    <div>
                        <Label htmlFor="language">Language</Label>
                        <Select id="language" name="language" defaultValue="en" disabled={isSubmitting}>
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                        </Select>
                    </div>
                     <div>
                        <Label htmlFor="notifications">Email Notifications</Label>
                        <Select id="notifications" name="notifications" defaultValue="weekly" disabled={isSubmitting}>
                            <option value="all">All Notifications</option>
                            <option value="weekly">Weekly Digest</option>
                            <option value="none">None</option>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="theme">Theme</Label>
                        <Input id="theme" name="theme" type="text" defaultValue="System Default" disabled />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Theme is controlled by your system preferences.</p>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <div className="flex items-center justify-between">
                            {submitMessage && (
                                <p className="text-sm text-green-600 dark:text-green-400">{submitMessage}</p>
                            )}
                            <div className="flex gap-4 ml-auto">
                                <Button type="button" variant="outline" size="default" disabled={isSubmitting}>
                                    Discard
                                </Button>
                                <Button type="submit" variant="primary" size="default" disabled={isSubmitting}>
                                   {isSubmitting ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </>
    );
};

export default Data;