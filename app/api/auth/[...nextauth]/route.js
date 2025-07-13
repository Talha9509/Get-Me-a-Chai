import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'

import mongoose from 'mongoose'
import User from '@/models/User'
import Payments from '@/models/Payments'
import connectDB from '@/db/connectDb'


export const authoptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        if (["github", "google","twitter","linkedin","facebook"].includes(account.provider)) {
          await connectDB()

          // check if user already exists in database
          const currentUser= await User.findOne({email:email})

          if(!currentUser){
            // create a new user
            const newUser = new User({
              email:user.email,
              username:user.email.split("@")[0],
            })
            await newUser.save()
          }
          else{
            // If user doesn’t exist, create one using the part of their email before the “@” as a default username.
            user.name = currentUser.username
          }
          return true
        }
      },
      async session({ session, user, token}){
        await connectDB()
        const dbUser = await User.findOne({email:session.user.email})
        session.user.name = dbUser.username
        return session
      }
    }

  
})

export { authoptions as GET, authoptions as POST }
