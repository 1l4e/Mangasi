import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import prisma from "@/lib/prisma";
import md5 from 'md5'
import { redirect } from "next/navigation";
import {hash} from 'bcrypt'
import { signIn } from "next-auth/react";

export default function Register() {
    async function Register(formData:FormData){
        "use server";
        const name = formData.get('name')?.toString();
        const email = formData.get('email')?.toString();
        const password = formData.get('password')?.toString();
        const password_confirmation = formData.get('password_confirmation')?.toString();
        const referral = formData.get('referral')?.toString();
        if (!name || !email || !password || !password_confirmation || !referral || password!=password_confirmation ||referral !== 'chamthoi.com'){
            return {
                message: "Error"
            }
        }
        const check =await prisma.users.findFirst({
            where:{
                email: email.toLowerCase()
            }
        })
        const pass = await hash(password,10);
        if (!check){
            const res =await prisma.users.create({
                data:{
                    name,
                    email:email.toLowerCase(),
                    password: pass,
                    is_admin:false
                }
            })
            if (res){
                await signIn("credentials", {
                    email: email.toLowerCase(),
                    password: password,
                    redirect: true,
                    callbackUrl: "/sources/",
                  })
            }
        }
        redirect('/dashboard')
    }
  return (
    <>
        <div className="max-w-xs flex flex-col justify-center items-center gap-4">
            <h1 className="text-xl py-4">Register Account</h1>
            <form action={Register}>
                <Label>Name</Label>
                <Input name="name" type="text" />
                <Label>Email</Label>
                <Input name="email" type="email" />
                <Label>Password</Label>
                <Input name="password" type="password" />
                <Label>Password Verification</Label>
                <Input name="password_confirmation" type="password" />
                <Label>Referral</Label>
                <Input name="referral" type="text" />
                <Button className="mt-2">Submit</Button>
            </form>
        </div>
    </>
  )
}
