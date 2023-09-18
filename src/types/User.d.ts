import 'next-auth';
import { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
    export interface User {
        id :number,
        name?:string,
        email?:string,
        password?:string,
        is_admin?:boolean
    }
    interface Session extends DefaultSession  {
        user:User
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        is_admin?:boolean
    }
}