"use client";

import { home } from "@/lib/constant";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const SourceGallery = ({ sources, page,search }: { sources: any; page: number,search?:string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 20
      ) {
        // User has reached the end of the page, load the next page
        setIsLoading(true); // Set loading to true while pushing to the next page
        let main = `/dashboard/sources/${sources.id}`
        let url = '';
        if (search) url=`${main}?search=${search}`
        if (page) url=`${main}?page=${page + 1}`
        if (search && page) url =`${main}?search=${search}&page=${page+1}`
        router.push(url);
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
