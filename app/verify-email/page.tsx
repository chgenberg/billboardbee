'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifierar din e-postadress...');
  const [email, setEmail] = useState('');
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setStatus('error');
        setMessage('Ogiltig verifieringslänk. Ingen token hittades.');
        return;
      }

      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!response.ok) {
          if (data.expired) {
            setStatus('error');
            setMessage('Verifieringslänken har gått ut. Vänligen begär en ny länk.');
            setEmail(data.email);
          } else {
            throw new Error(data.message || 'Ett fel uppstod vid verifiering');
          }
          return;
        }

        setStatus('success');
        setMessage('Din e-postadress har verifierats! Du kan nu logga in.');
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Ett fel uppstod vid verifiering');
      }
    };

    verifyEmail();
  }, [searchParams]);

  const handleResendVerification = async () => {
    if (!email) return;

    setIsResending(true);
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ett fel uppstod vid återsändning');
      }

      setMessage('Ett nytt verifieringsmail har skickats. Vänligen kolla din inkorg.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Ett fel uppstod vid återsändning');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            E-postverifiering
          </h2>
        </div>

        <div className="mt-8 space-y-6">
          <div className={`rounded-md p-4 ${
            status === 'loading' ? 'bg-blue-50 text-blue-700' :
            status === 'success' ? 'bg-green-50 text-green-700' :
            'bg-red-50 text-red-700'
          }`}>
            <p className="text-center">{message}</p>
          </div>

          {status === 'success' && (
            <div className="text-center">
              <Link
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Gå till inloggning →
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              {email && (
                <div className="text-center">
                  <button
                    onClick={handleResendVerification}
                    disabled={isResending}
                    className="font-medium text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
                  >
                    {isResending ? 'Skickar...' : 'Skicka ny verifieringslänk'}
                  </button>
                </div>
              )}
              <div className="text-center">
                <Link
                  href="/register"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Gå tillbaka till registrering →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 