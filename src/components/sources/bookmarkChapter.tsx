"use client";

import { addBookMark, deleteBookmark } from "@/action/CollectionController";
import { BookMarked } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useTransition } from "react";

const BookmarkChapter = ({bookmark,chapterSlug,parent}: any) => {
  const { data: session } = useSession();
  const [isLoading,startTransition] = useTransition()
  if (!session ) {
    return <></>;
  }
  const userId = session.user.id;

  return (
    <div className={`bg-green-500 px-4 py-2 rounded-full`}>
        {bookmark === null ? 
        <>
        <form className='flex' action={(e)=>startTransition(()=> {
        addBookMark(userId,chapterSlug,parent)
         })}>
            <button>
            <BookMarked className="inline-block w-6 h-6" />{" "}
            {isLoading ? "Adding" : "Add"}
            </button>
            
        </form>
        </> :
         <div>
        <form className='flex' action={(e)=>startTransition(()=> {
        deleteBookmark(bookmark.id)
         })}>
            <button>
            <BookMarked className="inline-block w-6 h-6" />{" "}
            {isLoading? "Deleting" : "Del"}
            </button>
            
        </form>
        </div>
        }
        
     
    </div>
  );
};

export default BookmarkChapter;
