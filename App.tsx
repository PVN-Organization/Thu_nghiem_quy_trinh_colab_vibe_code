import React, { useState } from 'react';
import { Button } from '@pvn/formkit';
import { Input } from '@pvn/formkit';
import { Label } from '@pvn/formkit';
import { Select } from '@pvn/formkit';
import { Textarea } from '@pvn/formkit';

import Form from './modules/module_form/components/Form';
import Data from './modules/module_data/components/Data';
import Dashboard from './modules/module_dashboard/components/Dashboard';

type Page = 'showcase' | 'form' | 'data' | 'dashboard';

const Showcase: React.FC = () => {
    const [formData, setFormData] = useState({
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        framework: 'react',
        bio: 'A passionate React developer exploring new technologies and building beautiful UIs.',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');
        console.log('Form Submitted:', formData);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitMessage('Profile updated successfully!');
            setTimeout(() => setSubmitMessage(''), 3000);
        }, 1500);
    };

  return (
    <>
       <header className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white tracking-tight">FormKit UI Showcase</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">A demonstration of a beautiful and reusable form component library.</p>
        </header>
        <main className="bg-white dark:bg-gray-800/50 rounded-lg shadow-2xl p-8 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" type="text" placeholder="Your full name" value={formData.name} onChange={handleChange} disabled={isSubmitting} />
                </div>
                <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} disabled={isSubmitting} />
                </div>
            </div>

            <div>
              <Label htmlFor="framework">Favorite Framework</Label>
              <Select id="framework" value={formData.framework} onChange={handleChange} disabled={isSubmitting}>
                <option value="react">React</option>
                <option value="vue">Vue</option>
                <option value="svelte">Svelte</option>
                <option value="angular">Angular</option>
                <option value="solid">Solid.js</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="bio">Biography</Label>
              <Textarea id="bio" placeholder="Tell us about yourself..." rows={4} value={formData.bio} onChange={handleChange} disabled={isSubmitting} />
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex items-center justify-between">
                     {submitMessage && (
                        <p className="text-sm text-green-600 dark:text-green-400 animate-pulse">{submitMessage}</p>
                    )}
                    <div className="flex gap-4 ml-auto">
                        <Button type="button" variant="outline" size="default" disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" size="default" disabled={isSubmitting}>
                           {isSubmitting ? 'Saving...' : 'Save Profile'}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Button Variants</h3>
                <div className="flex flex-wrap gap-4">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                </div>
                 <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mt-4">Button Sizes</h3>
                <div className="flex flex-wrap gap-4 items-center">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                </div>
            </div>
          </form>
        </main>
    </>
  );
}


const App: React.FC = () => {
    const [page, setPage] = useState<Page>('showcase');

    const renderPage = () => {
        switch (page) {
            case 'form':
                return <Form />;
            case 'data':
                return <Data />;
            case 'dashboard':
                return <Dashboard />;
            case 'showcase':
            default:
                return <Showcase />;
        }
    }

    const NavButton: React.FC<{ pageName: Page; children: React.ReactNode }> = ({ pageName, children }) => (
        <Button
            variant={page === pageName ? 'primary' : 'ghost'}
            onClick={() => setPage(pageName)}
        >
            {children}
        </Button>
    );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <nav className="mb-8 p-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center gap-2">
            <NavButton pageName="showcase">Showcase</NavButton>
            <NavButton pageName="form">Contact Form</NavButton>
            <NavButton pageName="data">Data Form</NavButton>
            <NavButton pageName="dashboard">Dashboard</NavButton>
        </nav>
        {renderPage()}
      </div>
    </div>
  );
};

export default App;