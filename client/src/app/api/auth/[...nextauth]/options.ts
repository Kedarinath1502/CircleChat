import { LOGIN_URL } from "@/lib/apiEndPoints";
import axios from "axios";
import { Account, AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export interface CustomSession {
    user : CustomUser,
    expires : ISODateString
}
export interface CustomUser {
    id? : string | null,
    name? : string | null,
    email? : string | null,
    image? : string | null,
    provider? : string | null,
    token? : string | null,
}

export const authOption:AuthOptions = {
    pages : {
        signIn : "/"
    },
    callbacks : {
        async signIn({ user, account }: {user:CustomUser, account : Account|null}) {
            try {
                console.log("the user is", user)
                console.log("the acoount is ", account)
                const payload = {
                    email : user.email,
                    name : user.name,
                    image : user?.image,
                    provider : account?.provider,
                    oauth_id : account?.providerAccountId
                }
                console.log("the payload is", payload)
                const {data} = await axios.post(LOGIN_URL, payload)
                console.log("the data is ", data)
                user.id = data?.user?.id.toString()
                user.token = data?.user?.token
                user.provider = data?.user?.provider
                return true
            } catch (error) {
                console.error("Sign-in error:", error);
                return false; 
            }
            
          },
        async session({ session, user, token }) {
            session.user = token.user as CustomUser
            return session;
          },
        async jwt({token, user}: {token: JWT, user: CustomUser}){
            if(user){
                token.user = user
            }
            return token
        }
    },
    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
              }
          })    
    ]
}