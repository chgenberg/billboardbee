"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  plan: string;
  role: 'ANNONSOR' | 'UTHYRARE';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name?: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("frejfund_user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && (parsed.role === 'ANNONSOR' || parsed.role === 'UTHYRARE')) {
          setUser(parsed);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock: accept demo@frejfund.com/demo123
    if (email === "demo@frejfund.com" && password === "demo123") {
      const u = { name: "Sara", email, plan: "SILVER", role: 'ANNONSOR' as const };
      setUser(u);
      localStorage.setItem("frejfund_user", JSON.stringify(u));
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name?: string) => {
    // Mock: always succeed
    const u = { name: name || "Sara", email, plan: "SILVER", role: 'ANNONSOR' as const };
    setUser(u);
    localStorage.setItem("frejfund_user", JSON.stringify(u));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("frejfund_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
} 