"use server"

import { getUserFromSession } from "@/action/UserController";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";


export async function updateUserSafe(formData:FormData){
    const session = await getServerSession(authOptions)
    const user = await getUserFromSession(session);
    const userSafe = user?.safe
    const safe = formData.get('safe');
    let checked = true;
    !safe /* && user?.is_admin */ && (checked = false)

    if (userSafe!= checked){
        await prisma.users.update({
            where:{
                email:user?.email
            },
            data:{
                safe: checked
            }
        })
        revalidatePath('/');
    }
   
}