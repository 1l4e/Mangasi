"use client";

import axios from "axios";
import { useEffect, useState } from "react";
/* import ListViewer from "./listViewer"; */

export default function ApiMangaViewer({ chapter, list, chapterSlug, id ,source}: any) {
  const [lists, setLists] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [imageWidth, setImageWidth] = useState("w-auto");

  const toggleImageWidth = () => {
    if (imageWidth === "w-auto") {
      setImageWidth("w-full");
    } else if (imageWidth === "w-full") {
      setImageWidth("w-2/3");
    } else {
      setImageWidth("w-auto");
    }
  };

  return (
    <div className="flex flex-col w-full">
     {/*  <ListViewer list={list} id={id} chapterSlug={chapterSlug} /> */}
      {chapter?.pages?.map((image: any, index: number) => (
        <div className="mx-auto w-full" key={index}>
            <img className={`${imageWidth}  mx-auto object-cover h-auto transition-opacity`} src={`/api/proxy?source=${source.url}&image=${image.image_url}`} alt="index"/>
        </div>
        
      ))}
       <button
        className="fixed top-1/2 right-4 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-full"
        onClick={toggleImageWidth}
      >
         {imageWidth}
      </button>
    </div>
  );
}
