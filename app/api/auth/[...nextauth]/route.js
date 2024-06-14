import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        eMail: { label: 'E-mail', type: 'e-mail' },
        password: { label: 'Şifre', type: 'password' },
      },
      authorize: async (credentials) => {
        console.log(credentials)
        if (credentials.eMail == 'emre@' && credentials.password == 'pass') {
          return { email: 'emrealgan@gmail.com', name: 'Emre' };
        } 
        else {
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };