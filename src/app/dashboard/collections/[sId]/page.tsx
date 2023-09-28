import { findManyCollectionItems, findManyCollectionItemsBookMark } from '@/action/CollectionController'
import NotFound from '@/app/not-found'
import MangaCardPrivate from '@/components/collections/mangaCardPrivate'
import Content from '@/components/content.component'
import { cn, toBase64 } from '@/lib/utils'
import { Collection } from '@/types/types'
import Link from 'next/link'

import React from 'react'



export default async function ColletionDetail({params}:{params:{sId:string}}) {
  const id = params.sId
  const mangaLists = await findManyCollectionItems(parseInt(id))
  const bookmarkLists = await findManyCollectionItemsBookMark(parseInt(id));
  if (!mangaLists || mangaLists.length ==0){
    return <NotFound />
  }
  const uniqueMangaIds = new Set();

  // Use map and filter to get unique manga objects
  const uniqueMangaArray = bookmarkLists.filter(item => {
    const { id } = item.manga;
    if (!uniqueMangaIds.has(id)) {
      uniqueMangaIds.add(id);
      return true;
    }
    return false;
  }).map(item => item.manga);
  return (
    <div>
      <Content>
      <div className='container mx-auto'>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:p-8 p-1 pt-6">
      {mangaLists.map((item:Collection,index:number)=> (
          <MangaCardPrivate key={index} data={item} collectionId={id}/>
        ))}
      </div>
      </div>
     
       
    </Content>
    <Content>
      <h1>Bookmark</h1>
      <div className='container mx-auto'>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:p-8 p-1 pt-6">
      {uniqueMangaArray.map((data:any,index:number)=> {

        return (
          <div className="">
            <div className="overflow-hidden rounded-md relative">
              <Link href={`/dashboard/bookmark?source=${data.sourceId}&cId=${id}&name=${toBase64(data.url)}`}>
                <img
                  src={data.image}
                  alt="alt"
                  width={305}
                  height={400}
                  className={cn("h-auto object-cover transition-all aspect-[3/4]")}
                />
              </Link>
              <div className=" text-center w-full ">
                <h3>{data.name}</h3>
                <ul>
                </ul>
              </div>
            </div>
          </div>
        )})}
      </div>
      </div>
     
       
    </Content>
    </div>

  )
}
