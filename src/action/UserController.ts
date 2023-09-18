import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth";

export async function getUserFromSession(session?:any){
    if (!session ) return null;
    const res = await prisma.users.findUnique({
        where: {
            email: session.user.email
        },
        select:{
            id:true,name:true,email:true,safe:true,is_admin:true
        }
    })
    return res
}


export async function isSafe(){
    const session = await getServerSession(authOptions);
    const user = await getUserFromSession(session);
    let safe = true;
    if (user){
        safe = user.safe
    }
    return safe
}