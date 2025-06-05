'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Register() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleFromQuery = searchParams?.get('role') || '';
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: roleFromQuery,
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: roleFromQuery ? roleFromQuery.toUpperCase() : 'ANNONSOR'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors([data.message || 'Ett fel uppstod vid registrering']);
        }
        return;
      }

      // Vid lyckad registrering, omdirigera till rätt dashboard baserat på roll
      const role = roleFromQuery ? roleFromQuery.toUpperCase() : 'ANNONSOR';
      console.log('Redirecting to dashboard with role:', role); // Debug-loggning
      
      if (role === 'UTHYRARE') {
        router.push('/dashboard/uthyrare');
      } else if (role === 'ANNONSOR') {
        router.push('/dashboard/annonsor');
      } else {
        // Fallback om något går fel
        router.push('/dashboard/annonsor');
      }
    } catch (error) {
      console.error('Registration error:', error); // Debug-loggning
      setErrors(['Ett oväntat fel uppstod. Försök igen senare.']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center pt-20"
      style={{ backgroundImage: 'url(/bakgrunden2.png)' }}
    >
      <div className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-[#ff6b00]/20">
        <div className="mb-8 w-full flex flex-col items-center">
          <h2 className="text-3xl font-bold text-[#ff6b00] mb-2">
            {roleFromQuery === 'uthyrare' ? 'Skapa konto som uthyrare' : roleFromQuery === 'annonsor' ? 'Skapa konto som annonsör' : 'Skapa konto'}
          </h2>
          <p className="text-sm text-gray-600 text-center">
            {roleFromQuery === 'uthyrare' && 'Registrera dig som markägare/uthyrare och börja annonsera ut dina skyltplatser.'}
            {roleFromQuery === 'annonsor' && 'Registrera dig som företag eller privatperson för att hyra skyltar och annonsera.'}
            {!roleFromQuery && 'Skapa ett konto för att komma igång.'}
            <br />
            Eller{' '}
            <Link href={roleFromQuery ? `/login?role=${roleFromQuery}` : '/login'} className="font-medium text-[#ff6b00] hover:underline transition-colors">
              logga in på ditt befintliga konto
            </Link>
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-6">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 shadow-sm text-gray-700 font-semibold text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Fortsätt med Google
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 shadow-sm text-gray-700 font-semibold text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
            </svg>
            Fortsätt med Facebook
          </button>
        </div>

        <div className="relative flex items-center justify-center my-6">
          <div className="border-t border-gray-200 w-full"></div>
          <span className="bg-white/95 px-4 text-sm text-gray-500">eller</span>
          <div className="border-t border-gray-200 w-full"></div>
        </div>

        <form className="w-full space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-postadress
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/20 transition-all duration-200 bg-white/50 backdrop-blur-sm text-[#222]"
                placeholder="din@email.se"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Lösenord
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/20 transition-all duration-200 bg-white/50 backdrop-blur-sm text-[#222]"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div className="group">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Namn (valfritt)
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/20 transition-all duration-200 bg-white/50 backdrop-blur-sm text-[#222]"
                placeholder="Ditt namn"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          {errors.length > 0 && (
            <div className="rounded-xl bg-red-50 p-4 border border-red-100">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Följande fel uppstod:
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <ul className="list-disc pl-5 space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-white bg-[#ff6b00] hover:bg-white hover:text-[#ff6b00] hover:border-[#ff6b00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff6b00] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-bold shadow-lg hover:shadow-xl text-lg"
            >
              {isLoading ? 'Registrerar...' : 'Skapa konto'}
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 mt-4 rounded-xl border border-[#183E4F] bg-white hover:bg-[#f7f7f7] shadow-sm text-[#183E4F] font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#183E4F]/30"
              style={{ boxShadow: '0 2px 8px 0 rgba(24,62,79,0.08)' }}
              title="Registrera med BankID (snart tillgängligt)"
              disabled
            >
              <Image
                src="/bankid.png"
                alt="BankID"
                width={32}
                height={32}
                className="object-contain"
              />
              Registrera med BankID
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 