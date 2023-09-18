"use server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isSafe } from "./UserController";



export async function findManyCollectionItems(collectionId:number){
    const safe = await isSafe();
    if (safe){
        const res = await prisma.manga.findMany({
            where:{
                safe: safe,
              collection:{
                some:{
                    id:collectionId
                }
              }
            },
    
        })
        return res
    }
    const res = await prisma.manga.findMany({
        where:{
          collection:{
            some:{
                id:collectionId
            }
          }
        },

    })
    return res
}

export async function deleteOneMangaFromCollection(formData:FormData,userId?:number){
    const collection = formData.get('collection')?.toString()
    const manga = formData.get('manga')?.toString()
    if (!collection || !manga || !userId){
        return
    }

    const check = await prisma.manga.findFirst({
        where:{
            collection:{
                some: {
                    id:parseInt(collection),
                    users:{
                        id: userId
                    }
                }
            }
        }
    })
    if(check){
       await prisma.manga.update({
        where:{
            id: parseInt(manga)
        },
        data:{
            collection:{
                disconnect:{
                    id: parseInt(collection)
                }
            }
        }
       })
    }
    revalidatePath(`/dashboard/collections/${collection}`);
    return

}

export async function findManyCollectionByEmail(userId:number){
    const safe = await isSafe();
    if (safe){
        const res = await prisma.collection.findMany({
            where:{
                author_id:userId,
                safe:safe
            }
        })
        return res
    }
    const res = await prisma.collection.findMany({
        where:{
            author_id:userId
        }
    })
    return res
}

export async function addNewCollection(userId:any,formData:FormData){
    if (!userId) return
   const name = formData.get('name')?.toString();
   const description = formData.get('description')?.toString();
   const image = formData.get('image')?.toString();
   const user = formData.get('user')?.toString();
   if (user!= userId || !name || !description || !image) return
   
   await prisma.collection.create({
    data:{
        name,
        description,
        image,
        author_id: userId
    }
   })
   return redirect('/dashboard/collections')
}


export async function addMangaToCollection(formData:FormData){
    const name= formData.get('name')?.toString();
    let image= formData.get('image')?.toString();
    const manga = formData.get('manga')?.toString();
    const collection = formData.get('collection')?.toString();
    const source = formData.get('source')?.toString();
    if (!manga || !collection || !source || !name ){
        return {
            status:400,
            message: "Check input"
        }
    }
    if (!image){
        image = "data:image/png;base64,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";
    }
    const man = await prisma.manga.findFirst({
        where: {
            slug: manga,
            sourceId: parseInt(source)
        }
    })
    console.log("aa")
    if (!man)
    {
        console.log("Add New Manga")
        const addManga = await prisma.manga.create({
            data:{
            name:name,
            image:image,
            slug:manga,
            description:"",
            url: manga,
            chapters: {},
            sourceId: parseInt(source),
            collection:{
                connect:{
                    id: parseInt(collection),
                }
            }
            }
        })
        console.log('Added')
        revalidatePath('/dashboard/sources/[sId]')
        revalidatePath('/dashboard/sources/[sId]/[...mangaSlug]')
        return {
            status:200,
            message: "Add New Manga + Favorite"
        }
    }
    //Manga exists
    console.log("Manga Exists")
   const check = await prisma.manga.findFirst({
    where: {
        slug:manga,
        sourceId: parseInt(source),
        collection:{
            some:{
                id: parseInt(collection)
            }
        }
    }
   })
   console.log("Manga is not in Collection, Add new")
   if (!check){
    await prisma.manga.update({
        where:{
            slug:manga,
            sourceId:parseInt(source)
        },
        data:{
            collection:{
                connect:{
                    id: parseInt(collection)
                }
            }
        }
    })
   }
   revalidatePath('/dashboard/sources/[sId]')
   return {
    status:200,
    message: "OK"
   }

}