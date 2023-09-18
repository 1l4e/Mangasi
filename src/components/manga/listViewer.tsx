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
  const [lists, setLists] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextC, setNext] = useState("");
  const [prevC, setPrev] = useState("");
  const router = useRouter();
  async function fetchLists() {
    if (isLoading) return;
    setIsLoading(true);
    const res = await fetch(list,{
      cache:'no-cache'
    });
    const data = await res.json();
    setLists(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchLists();
  }, []);

  useEffect(() => {
    if (lists.chapters) {
      const slug = chapterSlug.join("/");
      const currentIndex = lists.chapters?.findIndex((chapter: any) =>
        chapter.url.includes(slug)
      );

      const prevChapter =
        currentIndex !== -1 && currentIndex < lists.chapters.length - 1
          ? lists.chapters[currentIndex + 1].url
          : null;
      const nextChapter =
        currentIndex !== -1 && currentIndex > 0
          ? lists.chapters[currentIndex - 1].url
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
  }, [chapterSlug, lists.chapters, id, router]);

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
            <MangaChapterListComponent  mangaData={lists} id={id} />
          
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
