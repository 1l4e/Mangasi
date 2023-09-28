"use client";

import {  useState } from "react";
import ListViewer from "./listViewer";
import Overlay from "./overlay";
import TopBarProgress from "../sources/user/TopBarProgress.component";
import ButtonChangeSize from "../sources/user/ButtonChangeSize.component";
import ImageLoader from "./imageLoader";
import lazyImage from '@/../public/images/icon.png';

export default function MangaViewer({
  mangaData,
  id,
  chapterSlug,
  source,
  list,
  parent,
  bookmark
}: any) {
  const [imageWidth, setImageWidth] = useState("w-auto");
  const [showOverlay, setShowOverlay] = useState(false);
  const proxy = source.selector.proxy || 'proxy'

  const toggleUI = () => {
    setShowOverlay(!showOverlay);
  };
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
    <>
      <div className="flex flex-col w-full min-h-[120vh]">
     
      <TopBarProgress />
      <ButtonChangeSize chapterSlug={chapterSlug} source={source} showOverlay={showOverlay} toggleImageWidth={toggleImageWidth} imageWidth={imageWidth} parent={parent} bookmark={bookmark} />
      <div className="reader min-h-screen ">

      {mangaData?.images?.map((image: any, index: number) => (
        <div className="mx-auto w-full h-full relative" key={index}>
          <ImageLoader
            errorSrc={lazyImage.src}
            loading="lazy"
            className={`${imageWidth}  mx-auto object-cover h-auto transition-opacity`}
            src={image}
            alt="index"
          />
        </div>
      ))}
      </div>
     { <ListViewer
        className={`${showOverlay ? "" : "hidden"} `}
        list={list}
        id={id}
        chapterSlug={chapterSlug}
      />}
       <Overlay show={true} onClick={toggleUI} />
    </div>
   
    </>
    
  );
}
