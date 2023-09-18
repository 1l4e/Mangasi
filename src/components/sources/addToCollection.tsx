"use client"
import React, { useTransition } from 'react'

import { useSession } from 'next-auth/react';
import { addMangaToCollection } from '@/action/CollectionController';
import { Button } from '../ui/button';

export default function AddToCollection({collections,data,id}:any) {
    const [loading,startTransition] = useTransition();
    const {data:session} = useSession();
    if (!session){
        return <></>
    }

  return (
    <div className='flex justify-center items-center'>
    <form className='flex' action={(e)=>startTransition(()=> {
        addMangaToCollection(e)
    })}>
          <input name="manga" type="hidden" value={data.url}></input>
          <input name="name" type="hidden" value={data.name}></input>
          <input name="image" type="hidden" value={data.image}></input>
          <input name="source" type="hidden" value={id}></input>
          <select name="collection" className='min-w-[200px] rounded-sm px-4'>
        
              {collections.map((item: any, index: number) => (
                <option className='px-4' key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
        </select>
        
          <Button className="">
            {loading ?'...' : "Add"}
          </Button>
        </form>
    </div>
  )
}
