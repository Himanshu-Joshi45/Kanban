import { useAuth } from './contexts/AuthContext';
import { Landing } from './components/Landing';
import { Board } from './components/Board';

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return user ? <Board /> : <Landing />;
}

export default App;
