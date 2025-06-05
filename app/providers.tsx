'use client';
import { ModalProvider } from './context/ModalContext';
import { AuthProvider } from './context/AuthContext';
import LoginModalWrapper from './components/LoginModalWrapper';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ModalProvider>
        {children}
        <LoginModalWrapper />
      </ModalProvider>
    </AuthProvider>
  );
} 