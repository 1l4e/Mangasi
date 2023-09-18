
import { signOut,signIn, getSession } from "next-auth/react"
import { useSession } from "next-auth/react"

export default function ProfileComponents() {
    const { data: session, status } = useSession()
    if (session){
        return (
            <button onClick={() => signOut()}>Sign out</button>
          )
    }
    else{
        return (
            <button onClick={() => signIn()}>Sign in</button>
          )
    }
 
}
