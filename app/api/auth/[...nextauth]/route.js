"use server"
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { connectDB, disconnectDB } from '@/app/lib/db';
import { User, userOAuth } from '@/app/models/User';
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing

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
          const user = await User.findOne({ mail: credentials.mail });
          await disconnectDB();

          if (user) {
            const passwordMatch = await bcrypt.compare(credentials.password, user.password);
            if (passwordMatch) {
              return { email: user.mail, provider: 'credentials' };
            } 
            else {
              return null; // Passwords don't match
            }
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.provider = token.provider;
      if (token.email) {
        session.user.email = token.email;
      }
      return session;
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.provider = account.provider;
        token.email = user.email; // Ensure user is defined here
      }
      return token;
    },
  async signIn({ user, account }) {
    if (account.provider === 'google') {
      await connectDB();
      let existingUser = await userOAuth.findOne({ mail: user.email });
      if (!existingUser) {
        existingUser = new userOAuth({ mail: user.email, translatedText: [] });
        await existingUser.save();
      }
      await disconnectDB();
    }
    return true;
  },
},
  pages: {
    signIn: "/auth/login",
  }
});

export { handler as GET, handler as POST };
