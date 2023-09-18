import GoToTopButton from '@/components/manga/backTop'
import { ArrowLeftRight, ArrowRightToLine, MoveHorizontal, MoveLeft, Repeat } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function ButtonChangeSize({showOverlay,toggleImageWidth,imageWidth,parent,source}:any) {
  return (
    <div  className={`${
      showOverlay ? "" : "hidden"
    } `}>
  <div  className={`fixed bottom-20 z-50 flex-col gap-1 flex right-2 `}
    >
      <Link href={`/dashboard/sources/${source.id}/${parent}`} className='bg-green-500 px-4 py-2 rounded-full flex justify-between'>
         <MoveLeft className='inline-block' /> Back
      </Link>
      <button className='bg-green-500 px-4 py-2 rounded-full flex justify-between'
      onClick={toggleImageWidth}
      >
        {imageWidth ==='w-auto' ? <><Repeat className='inline-block' />Auto</>: 
        imageWidth==='w-full'? <><MoveHorizontal className='inline-block' />Full</> :
         <><ArrowRightToLine className='inline-block'/>2/3</> }
      </button>
       <GoToTopButton />

    </div>
    </div>
    
   
  )
}
