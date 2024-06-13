import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'E-mail', type: 'text' },
        password: { label: 'Şifre', type: 'password' },
      },
      authorize: async (credentials) => {
        console.log(credentials)
        if (credentials.username == 'user' && credentials.password == 'pass') {
          return { id: 1, name: 'User' };
        } 
        else {
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
