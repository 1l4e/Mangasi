import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Plus } from "lucide-react"
import Link from "next/link"


export default function CollectionCard({data}: {data?: {id:number,name:string,image:string,description:string,updated:string,total:number}}) {
 if (data){
    return (
        <Card className={`w-[150px] h-[200px]  cursor-pointer `} style={{backgroundImage: `url(${data.image})`,backgroundSize: `contain`}}>
        <Link href={`/dashboard/collections/${data.id}`}>
        <CardHeader className="bg-black/50">
            <CardTitle className=" text-xl drop-shadow-md">{data.name}</CardTitle>
            <CardDescription className=" drop-shadow-md text-red-500 font-bold">{data.description}</CardDescription>
        </CardHeader>
        <CardContent className="bg-black/50">
            <p className="text-xs">Total : {data.total}</p>
        </CardContent>
        <CardFooter className="bg-black/50">
            <p className="text-xs">Updated : {data.updated}</p>
        </CardFooter>
        </Link>
        
        </Card>
  )
 }

 return (
    <Card className="w-[150px] h-[200px] opacity-30 hover:opacity-80 cursor-pointer">
        <CardHeader>
            <CardTitle className="text-md text-center"> Add New </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center ">
            <Link href="/dashboard/collections/new">
            <Plus size={80} />
            </Link>
        </CardContent>

    </Card>
 )
    
}
