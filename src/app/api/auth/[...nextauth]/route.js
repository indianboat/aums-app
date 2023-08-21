import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../../../middleware/db";
import User from "../../../../../models/users";
import argon2i from "argon2";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        await connectDB();

        const { email, password } = credentials;

        const userExist = await User.findOne({ email });

        if (!userExist) {
          throw new Error("Unauthorized Access !");
        }

        const matchPassword = await argon2i.verify(userExist.password, password);

        if (!matchPassword || userExist.email !== email) {
          throw new Error("Invalid Credentials");
        }
        return userExist;
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        return {
          ...token,
          id: user._id,
          role: user.role
        }
      }
      return token;
    },

    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role
        }
      };
      return session;
    }
  },
  session: {
    strategy: "jwt"
  },
  theme: {
    colorScheme: "light",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }