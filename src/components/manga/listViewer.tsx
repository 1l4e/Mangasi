"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import MangaChapterListComponent from "../sources/user/MangaChapterList.component";

export default function ListViewer({ list, id, chapterSlug ,className }: any) {

  const [nextC, setNext] = useState("");
  const [prevC, setPrev] = useState("");
  const router = useRouter();


  useEffect(() => {
    if (list.chapters) {
      const slug = chapterSlug.join("/");
      const currentIndex = list.chapters?.findIndex((chapter: any) =>
        chapter.url.includes(slug)
      );

      const prevChapter =
        currentIndex !== -1 && currentIndex < list.chapters.length - 1
          ? list.chapters[currentIndex + 1].url
          : null;
      const nextChapter =
        currentIndex !== -1 && currentIndex > 0
          ? list.chapters[currentIndex - 1].url
          : null;
      setNext((prev) => nextChapter);
      setPrev((prev) => prevChapter);
      const handleScroll = () => {
        if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 1
        ) {
          if (nextChapter) {
            router.push(`/dashboard/sources/${id}/${nextChapter}`);
          }
        }
      };
      const handleKeyDown = (e: any) => {
        if (e.keyCode === 37 && prevChapter !== null) {
          router.push(`/dashboard/sources/${id}/${prevChapter}`);
        } else if (e.keyCode === 39 && nextChapter !== null) {
          router.push(`/dashboard/sources/${id}/${nextChapter}`);
        }
      };
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [chapterSlug, list.chapters, id, router]);

  return (
    <div className={className}>
      <div
        className="dragonal h-screen text-xl lg:text-4xl w-full flex justify-center items-center text-red-500"
        style={{
          textShadow: `0 13.5rem rgb(239 68 68 / var(--tw-text-opacity)),0 27rem rgb(239 68 68 / var(--tw-text-opacity)),0 -13.5rem rgb(239 68 68 / var(--tw-text-opacity)),0 -27rem rgb(239 68 68 / var(--tw-text-opacity))`,
        }}
      >
        {nextC ? "Scroll to next Chapter" : "This is the last chapter"}
      </div>
      {/* <div className="h-4"></div> */}
      <div className="fixed bottom-20 z-50 flex-col gap-4 flex left-2">
        <div>
          {prevC && (
            <Link
              className="bg-green-500 px-4 py-2 rounded-full"
              href={`/dashboard/sources/${id}/${prevC}`}
            >
              Prev
            </Link>
          )}
        </div>
        <Dialog>
          <DialogTrigger>
            <span className="bg-green-500 px-4 py-2 rounded-full">
              Chapters
            </span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>List of Chapter</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="flex flex-col h-[50vh] overflow-scroll">
        <ul className="grid grid-cols-1 px-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-2 text-xs">
          {list.chapters?.map((chapter: any, index: number) => (
            <li className="" key={index}>
              <Link
                className="flex px-4 py-2 bg-green-700 justify-between items-center font-bold rounded-full text-white visited:text-red-600 visited:bg-gray-600 visited:hover:bg-gray-400 "
                href={`/dashboard/sources/${id}/${chapter.url}`}
              >
                <span> {chapter.name}</span>
                <span className="text-xs text-gray-200">
                  {" "}
                  {chapter.updated_at}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
          
          </DialogContent>
        </Dialog>

        <div>
          {nextC && (
            <Link
              className="bg-green-500 px-4 py-2 rounded-full"
              href={`/dashboard/sources/${id}/${nextC}`}
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
