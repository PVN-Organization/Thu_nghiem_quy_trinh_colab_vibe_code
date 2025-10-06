import React, { useState } from 'react';
import { Button } from '@pvn/formkit';
import { Input } from '@pvn/formkit';
import { Label } from '@pvn/formkit';
import { Select } from '@pvn/formkit';
import { Textarea } from '@pvn/formkit';

const Form: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        console.log('Contact Form Submitted:', data);

        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitMessage('Your message has been sent!');
             (e.target as HTMLFormElement).reset();
            setTimeout(() => setSubmitMessage(''), 3000);
        }, 1500);
    };

    return (
        <>
            <header className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white tracking-tight">Contact Us</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">We'd love to hear from you.</p>
            </header>
            <main className="bg-white dark:bg-gray-800/50 rounded-lg shadow-2xl p-8 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="contact-name">Full Name</Label>
                            <Input id="contact-name" name="name" type="text" placeholder="Jane Doe" disabled={isSubmitting} required />
                        </div>
                        <div>
                            <Label htmlFor="contact-email">Email Address</Label>
                            <Input id="contact-email" name="email" type="email" placeholder="you@example.com" disabled={isSubmitting} required />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Select id="subject" name="subject" disabled={isSubmitting} required>
                            <option value="" disabled selected>Select a subject</option>
                            <option value="general">General Inquiry</option>
                            <option value="support">Technical Support</option>
                            <option value="feedback">Feedback</option>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" name="message" placeholder="Your message here..." rows={5} disabled={isSubmitting} required />
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <div className="flex items-center justify-between">
                            {submitMessage && (
                                <p className="text-sm text-green-600 dark:text-green-400">{submitMessage}</p>
                            )}
                            <Button type="submit" variant="primary" size="default" disabled={isSubmitting} className="ml-auto">
                               {isSubmitting ? 'Sending...' : 'Send Message'}
                            </Button>
                        </div>
                    </div>
                </form>
            </main>
        </>
    );
};

export default Form;