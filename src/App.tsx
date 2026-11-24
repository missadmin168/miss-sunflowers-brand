import { useState } from 'react';
import { AppProvider, useApp, type AppRole } from '@/context/AppContext';
import ToastContainer from '@/components/Toast';
import SplashScreen from '@/views/SplashScreen';
import PublicHub from '@/views/PublicHub';
import LoginModal from '@/views/LoginModal';
import DealerHub from '@/views/DealerHub';
import CEOAdmin from '@/views/CEOAdmin';

function AppContent() {
  const { role, setRole } = useApp();
  const [splashDone, setSplashDone] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleLogin = (newRole: AppRole) => {
    setRole(newRole);
    setLoginOpen(false);
  };

  const handleLogout = () => {
    setRole('public');
  };

  if (!splashDone) {
    return <SplashScreen onDone={() => setSplashDone(true)} />;
  }

  return (
    <>
      <div className="max-w-md mx-auto min-h-screen relative shadow-xl" style={{ background: 'var(--bg-base)' }}>
        {role === 'public' && <PublicHub onLoginClick={() => setLoginOpen(true)} />}
        {role === 'dealer' && <DealerHub onLogout={handleLogout} onGoPublic={() => setRole('public')} />}
        {role === 'ceo' && <CEOAdmin onLogout={handleLogout} />}
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onLogin={handleLogin} />
      <ToastContainer />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
