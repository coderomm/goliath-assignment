import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Button } from '../../components/common/Button';

export const Header: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <h1 className="text-xl font-semibold text-gray-900">
                            Product Dashboard
                        </h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-700">
                            <span className="font-medium">Welcome,</span>{' '}
                            <span className="text-indigo-600">{user?.email}</span>
                        </div>

                        <Button
                            variant="danger"
                            size="sm"
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};