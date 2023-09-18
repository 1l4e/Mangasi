import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import md5 from "md5";
import { compare } from "bcrypt";
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const pass = credentials?.password
        if (!pass) return null
        const user = await prisma.users.findFirst({
          where: {
            email: credentials?.email.toLowerCase(),
          },
          select:{
            id:true,name:true,email:true,is_admin:true,password:true,safe:true
          }
        })
        
        if (!user || !await compare(pass,user.password)){
          return null
        }
        return user as User;
      },
      
    }),
  ],
  callbacks: {
    jwt({token,user}) {
     return {...token,...user}
    },
    session({session,token}) {
      let is_admin = token.is_admin
      if (is_admin == undefined){
        is_admin = false
      }
      /* @ts-expect-error stupid next-auth declaration */
      session.user.id = token.id;
      /* @ts-expect-error stupid next-auth declaration */
      session.user.safe = token.safe
      session.user.is_admin=is_admin;
      return session
    }
  },
};