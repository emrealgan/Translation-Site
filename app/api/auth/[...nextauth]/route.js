import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (credentials.username === 'user' && credentials.password === 'pass') {
          return { id: 1, name: 'User' };
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export const GET = async (req, res) => NextAuth(req, res, options);
export const POST = async (req, res) => NextAuth(req, res, options);
