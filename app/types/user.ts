export type UserRole = 'UTHYRARE' | 'ANNONSOR';

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  emailVerified: boolean;
  createdAt: Date;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
  role: UserRole;
} 