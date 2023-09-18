import NotFound from '@/app/not-found';
import { findOneSource } from '@/action/SourceModel';
import axios from 'axios';
import Link from 'next/link';
import React from 'react'

export default async function ApiMangaDetail({params}:any) {
    const sId:string = params.sId;
    const sources = await findOneSource(sId);
    if (!sources){
        return <NotFound />
    }
    let main = sources.url;
    const selector:any = sources.selector
    let url = `${main}${selector.manga.selector}${params.mangaSlug}`
    let chapters_url = `${url}/${selector.manga.child.chapter.chapterList}`
    const res = await axios.get(url);
    const res2 = await axios.get(chapters_url);
    const data = await res.data;
    const mangaData = data.data
    const chapterLists = await res2.data;
  return (
    <div className="flex flex-col w-full container">
     
      <div className="flex flex-col lg:flex-row py-20 gap-4">
        <img src={mangaData.cover_url}></img>
       
        <div className="flex flex-col">
        <h1 className="text-xl text-center">{mangaData.name}</h1>
        <div className="relative max-w-[220px]">

       {/*  <AddToCollection data={mangaData} collections={collections} id={sId} /> */}
        </div>
          <span>Author : {mangaData.author.name}</span>
          <span>Other Name: {mangaData.otherName}</span>

          <span>{mangaData.description}</span>
        </div>
      </div>
      <div className="flex flex-col">
                <ul className="grid grid-cols-1 px-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-2 text-xs">
                    {chapterLists.data?.map((chapter:any,index:number) => (
                        <li className="flex px-4 py-2 bg-green-700 justify-between items-center"  key={index}>
                            <Link className="font-bold rounded-full text-white visited:text-red-600 visited:bg-gray-600 visited:hover:bg-gray-400 " href={`/dashboard/sources/${sId}/${mangaData.id}/${chapter.id}`}>
                               Chapter {chapter.number}
                            </Link>
                            <span className="text-xs text-gray-200 max-w-[100px] overflow-hidden"> {chapter.updated_at}</span>
                        </li>
                    ))}
                </ul>
      </div>
    </div>
  )
}
