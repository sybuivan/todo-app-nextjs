import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authApi } from '../api/auth_api';

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Record<'email' | 'password', string>) {
        try {
          const response = await authApi.login(credentials);

          return response.data;
        } catch (error) {
          console.error('Authorization failed:', error);
          return null;
        }
      },
    }),
  ],
});
