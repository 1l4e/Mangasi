
import prisma from "@/lib/prisma"

type QueryType = {
    id:number,
    safe?: boolean
}

export async function findManySources(safe?:boolean){

    if (safe){
        const sources = await prisma.source.findMany({
            where:{
                safe
            }
        })
        return sources
    }
    const sources = await prisma.source.findMany({})
    return sources
}

export async function findOneSource(sId:string,safe?:boolean){

    let query:QueryType ={
        id: parseInt(sId),
    }
    if (safe){
        query.safe = safe
    }
    const source = await prisma.source.findFirst({
        where: query
    })
    return source
}