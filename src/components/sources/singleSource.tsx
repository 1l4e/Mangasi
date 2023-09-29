"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const SourceGallery = ({ sources, page }: { sources: any; page: number}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const mext = new URLSearchParams(Array.from(searchParams.entries()));
  if (mext.has('page')) mext.delete('page')
  mext.set('page',  page+1 +"")
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 20
      ) {
        // User has reached the end of the page, load the next page
        setIsLoading(true); // Set loading to true while pushing to the next page
       
        router.push(pathName+"?"+mext.toString());
        setIsLoading(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <div className="flex justify-center flex-col items-center w-full py-4 h-[70vh]">
      <span className="text-2xl lg:text-7xl" style={{textShadow: `0px 9rem #d33,0px -9rem #d33`}}>
      {isLoading ? (
        <>
        Loading Next Page...
        </>
      ) :(
        <>
        Scroll down to Next Page...
        </>
      ) }
      </span>
    </div>
  );
};

export default SourceGallery;
