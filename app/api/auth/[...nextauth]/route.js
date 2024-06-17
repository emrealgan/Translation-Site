import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB, disconnectDB } from '@/app/lib/db';
import User from '@/app/models/User';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        mail: { label: 'E-mail', type: 'string' },
        password: { label: 'Şifre', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          await connectDB();
          const user = await User.findOne({ mail: credentials.mail, password: credentials.password });
          await disconnectDB();

          if (user) {
            return { email: user.mail };
          } 
          else {
            return null;
          }
        } 
        catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };