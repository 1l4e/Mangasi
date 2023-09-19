import { findManyCollectionItems } from '@/action/CollectionController'
import NotFound from '@/app/not-found'
import MangaCardPrivate from '@/components/collections/mangaCardPrivate'
import Content from '@/components/content.component'
import { Collection } from '@/types/types'

import React from 'react'



export default async function ColletionDetail({params}:{params:{sId:string}}) {
  const id = params.sId
  const mangaLists = await findManyCollectionItems(parseInt(id))
  if (!mangaLists || mangaLists.length ==0){
    return <NotFound />
  }
  return (
    <Content>
      <div className='container mx-auto'>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:p-8 p-1 pt-6">
      {mangaLists.map((item:Collection,index:number)=> (
          <MangaCardPrivate key={index} data={item} collectionId={id}/>
        ))}
      </div>
      </div>
     
       
    </Content>
  )
}
