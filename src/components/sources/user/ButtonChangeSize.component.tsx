import GoToTopButton from '@/components/manga/backTop'
import { toBase64 } from '@/lib/utils'
import { ArrowLeftRight, ArrowRightToLine, MoveHorizontal, MoveLeft, Repeat } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import BookmarkChapter from '../bookmarkChapter'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function ButtonChangeSize({showOverlay,toggleImageWidth,imageWidth,parent,source,bookmark,chapterSlug}:any) {

  return (
    <div  className={`${
      showOverlay ? "" : "hidden"
    } `}>
  <div  className={`fixed bottom-20 z-50 flex-col gap-1 flex right-2 `}
    >
      <Link href={`/dashboard/manga?source=${source.id}&name=${toBase64(parent)}`} className='bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2'>
         {/* <MoveLeft className='inline-block' /> */} Info
      </Link>
      <Button className='flex justify-between gap-2'
      onClick={toggleImageWidth}
      >
        {imageWidth ==='w-auto' ? <><Repeat size={14} className='' />Auto</>: 
        imageWidth==='w-full'? <><MoveHorizontal size={14} className='' />Full</> :
         <><ArrowRightToLine size={14} className=''/>2/3</> }
      </Button>
      <BookmarkChapter bookmark={bookmark} chapterSlug={chapterSlug} parent={parent}/>
       <GoToTopButton />
    </div>
    </div>
    
   
  )
}
