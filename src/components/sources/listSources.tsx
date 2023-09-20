import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '../ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Input } from '../ui/input'
import { deleteSource } from '@/action/source'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import ButtonAction from '../serverActionSubmitButton'

export default async function ListSource({sources}:{sources:any}) {
  const session = await getServerSession(authOptions);

  return (
    <div>
    <Table>
      <TableCaption>List of Source</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          {/* <TableHead>Url</TableHead> */}
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          sources.map((item:any,index:number)=> (
            <TableRow key={index}>
            <TableCell className="font-medium">{index+1}</TableCell>
            <TableCell><Link className='flex items-center' href={`/dashboard/sources/${item.id}`}>
              <Image 
              className='inline-block pr-2'
              src={item.image}
               alt={item.name} width={200} height={30} />{item.name}</Link>
            </TableCell>
            {/* <TableCell>{session?.user.is_admin && item.url }</TableCell> */}
            <TableCell className="justify-end flex gap-2 ">
              {session?.user.is_admin && (
                <>
                                <Button asChild>
                <Link href={`/admin/sources/${item.id}/edit`}>
                Edit
                </Link>
                </Button>
                <form action={deleteSource}>
                <Input name="id" type="hidden" value={item.id} />
                <ButtonAction title="Delete"/>
                </form>
                </>
              )}
           
            </TableCell>
        </TableRow>
          ))
        }
        
      </TableBody>
    </Table>
    </div>
  )
}
