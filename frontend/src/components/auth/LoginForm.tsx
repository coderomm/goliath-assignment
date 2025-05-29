import React, { useState } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useAuth } from '../../../hooks/useAuth';
import type { LoginFormData } from '../../../utils/types'

export const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(formData.email, formData.password);
        } catch (err: any) {
            setError(err.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-6">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <Input
                            label="Email address"
                            type="email"
                            name="email"
                            required
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            required
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>

                    {error && (
                        <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        isLoading={isLoading}
                        className="w-full flex justify-center"
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </Button>

                    <div className="text-sm text-center text-gray-600 bg-gray-50 p-4 rounded-md">
                        <p className="font-medium mb-2">Demo credentials:</p>
                        <p>Email: admin@example.com</p>
                        <p>Password: admin123</p>
                        <p>Email: user@example.com</p>
                        <p>Password: user123</p>
                    </div>
                </form>
            </div>
        </div>
    );
};