import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { ensureDbConnected } from "@/app/db/connection";
import { Admin } from "@/app/db/schema";
import { Adapter } from "next-auth/adapters";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        await ensureDbConnected();

        try {
          console.log(credentials);
          if (!credentials) {
            throw new Error("Credentials not found");
          }

          const user = await Admin.findOne({
            username: credentials.identifier,
          });
          // console.log(user);

          if (user) {
            if (user.password !== credentials.password) {
              throw new Error("Password incorrect");
            } else {
              // console.log(user);
              return user;
            }
          } else {
            console.log("user not registered");
            throw new Error("user not registered");
          }
        } catch (err) {
          console.log("Error:", err);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.email = user.email;
        token.username = user.username;
      }
      // console.log(token);
      return token;
    },
    async session({ token, session }) {
      if (token) {
        if (session.user !== undefined) {
          session.user._id = token._id;
          session.user.email = token.email;
          session.user.username = token.username;
        }
      }
      // console.log(session);
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
};
