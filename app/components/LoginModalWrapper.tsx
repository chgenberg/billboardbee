'use client';

import { useModal } from '../context/ModalContext';
import LoginModal from './LoginModal';

export default function LoginModalWrapper() {
  const { isLoginModalOpen, closeLoginModal } = useModal();
  return <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />;
} 