export interface User {
  id: number;
  username: string;
  roles: UserRole[];
}

export interface UserToFetch {
  id: number;
  username: string;
  email: string;
  roles: UserRole[];
}

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

export interface UserCredentials {
  token: string;
  type: string;
  algorithm: string;
  expiresAt: string;
}

