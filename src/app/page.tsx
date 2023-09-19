import {getServerSession} from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';

export default async function Home() {
  return (
    <div className="flex flex-wrap flex-col w-full justify-center items-center">
   
      <Link href="/dashboard" >
       Dashboard
      </Link>
      <Link href="/dashboard/admin" >
       Admin
      </Link>
      <h1>Session</h1>
{/*     <pre >{JSON.stringify(session,null,4)}</pre> */}
    
    </div>
  )
}
