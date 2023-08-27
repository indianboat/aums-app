import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../../../middleware/db";
import User from "../../../../../models/student";
import argon2i from "argon2";
import Admin from "../../../../../models/admin";
import Student from "../../../../../models/student";
import Faculty from "../../../../../models/faculty";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        await connectDB();
        const { email, password } = credentials;
        if(credentials.role === "admin"){
          const adminUserExist = await Admin.findOne({ email });
          if (!adminUserExist) {
            throw new Error("Unauthorized Access !");
          }
  
          const matchPassword = await argon2i.verify(adminUserExist.password, password);
  
          if (!matchPassword || adminUserExist.email !== email) {
            throw new Error("Invalid Credentials");
          }
          return adminUserExist;
        }
        else if(credentials.role === "student"){
          const studentExist = await Student.findOne({ email });
          if (!studentExist) {
            throw new Error("Unauthorized Access !");
          }
  
          const matchPassword = await argon2i.verify(studentExist.password, password);
  
          if (!matchPassword || studentExist.email !== email) {
            throw new Error("Invalid Credentials");
          }
          return studentExist;
        }
        else if(credentials.role==="faculty"){
          const facultyExist = await Faculty.findOne({ email });
          if (!facultyExist) {
            throw new Error("Unauthorized Access !");
          }
  
          const matchPassword = await argon2i.verify(facultyExist.password, password);
  
          if (!matchPassword || facultyExist.email !== email) {
            throw new Error("Invalid Credentials");
          }
          return facultyExist;
        }
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
    strategy: "jwt",
    expires:30 * 60 * 1000
  },
  theme: {
    colorScheme: "light",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }