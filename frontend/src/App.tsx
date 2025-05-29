import { useAuth } from '../hooks/useAuth';
import { LoginForm } from './components/auth/LoginForm';
import { Dashboard } from './components/dashboard/Dashboard';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return user ? <Dashboard /> : <LoginForm />;
}

export default App
