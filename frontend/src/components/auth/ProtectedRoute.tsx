import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { LoginForm } from './LoginForm';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <LoadingSpinner size="lg" />
                    <p className="mt-4 text-lg text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <LoginForm />;
    }

    return <>{children}</>;
};