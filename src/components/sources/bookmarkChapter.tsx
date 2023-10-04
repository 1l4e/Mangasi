"use client";

import { addBookMark, deleteBookmark } from "@/action/CollectionController";
import { BookMarked } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useTransition } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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
        <form className='flex flex-col' action={(e)=>startTransition(()=> {
        addBookMark(e,userId,chapterSlug,parent)
         })}>
          <Input placeholder="Label" className="w-[100px]" name="position"></Input>
            <Button className="flex justify-between gap-2">
              <BookMarked size={14} />
            {isLoading ? "Adding" : "Save"}
            </Button>
            
        </form>
        </> :
         <div>
        <form className='flex flex-col' action={(e)=>startTransition(()=> {
        deleteBookmark(bookmark.id)
         })}>
          <Input value={bookmark?.position} className="w-[100px]" name="position"></Input>
      
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
