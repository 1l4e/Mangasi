"use client";

import { addBookMark, deleteBookmark } from "@/action/CollectionController";
import { BookMarked } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useTransition } from "react";
import { Button } from "../ui/button";

const BookmarkChapter = ({bookmark,chapterSlug,parent}: any) => {
  const { data: session } = useSession();
  const [isLoading,startTransition] = useTransition()
  if (!session ) {
    return <></>;
  }
  const userId = session.user.id;

  return (
    <div className="flex">
        {bookmark === null ? 
        <>
        <form className='flex' action={(e)=>startTransition(()=> {
        addBookMark(userId,chapterSlug,parent)
         })}>
            <Button className="flex justify-between gap-2">
              <BookMarked size={14} />
            {isLoading ? "Adding" : "Save"}
            </Button>
            
        </form>
        </> :
         <div>
        <form className='flex' action={(e)=>startTransition(()=> {
        deleteBookmark(bookmark.id)
         })}>
            <Button className="flex justify-between gap-2">
              <BookMarked size={14} />
              {isLoading? "Deleting" : "Del"}
            </Button>
            
        </form>
        </div>
        }
        
     
    </div>
  );
};

export default BookmarkChapter;
